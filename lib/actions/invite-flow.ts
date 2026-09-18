"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/session";
import { hashPassword } from "@/lib/auth";
import { membershipPackages } from "@/lib/config/tiers";
import { initializeKorapayCharge } from "@/lib/korapay";
import { siteConfig } from "@/lib/site-config";
import { checkInviteValidity } from "@/lib/invites";
import { sectionUrl } from "@/lib/subdomain";

export type ActionState = { error?: string; fieldErrors?: Record<string, string> };

export async function initializeInvitePaymentAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const code = String(formData.get("code"));
  const invite = await prisma.invite.findUnique({ where: { code } });
  const validity = checkInviteValidity(invite);
  if (!validity.ok || !invite) {
    return { error: "This invite link is no longer valid." };
  }

  const packageId = invite.packageId ?? String(formData.get("packageId") ?? "");
  const pkg = membershipPackages.find((p) => p.id === packageId);
  if (!pkg) {
    return { fieldErrors: { packageId: "Choose a package to continue." } };
  }

  const parsed = z
    .object({ name: z.string().trim().min(2, "Enter your full name"), email: z.email("Enter a valid email address") })
    .safeParse({ name: formData.get("name"), email: formData.get("email") });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { fieldErrors };
  }

  const reference = `JOVIA-INV-${randomUUID()}`;
  await prisma.payment.create({
    data: {
      inviteId: invite.id,
      packageId: pkg.id,
      amount: pkg.amountNaira,
      currency: "NGN",
      reference,
      status: "pending",
      customerName: parsed.data.name,
      customerEmail: parsed.data.email,
    },
  });

  const result = await initializeKorapayCharge({
    amount: pkg.amountNaira,
    currency: "NGN",
    reference,
    customerName: parsed.data.name,
    customerEmail: parsed.data.email,
    narration: `${pkg.name} package activation (invite)`,
    redirectUrl: `${siteConfig.url}/invite/${code}/register?reference=${reference}`,
    notificationUrl: `${siteConfig.url}/api/payments/webhook`,
  });

  if (!result.ok) {
    return { error: result.message };
  }

  redirect(result.checkoutUrl);
}

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  username: z
    .string()
    .trim()
    .min(3, "At least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, and underscores only"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  country: z.string().trim().min(2, "Enter your country"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function completeInviteRegistrationAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const code = String(formData.get("code"));
  const reference = String(formData.get("reference"));

  const invite = await prisma.invite.findUnique({ where: { code } });
  const validity = checkInviteValidity(invite);
  if (!validity.ok || !invite) {
    return { error: "This invite link is no longer valid." };
  }

  const payment = await prisma.payment.findUnique({ where: { reference } });
  if (!payment || payment.inviteId !== invite.id) {
    return { error: "We couldn't find that payment. Please start again from your invite link." };
  }
  if (payment.status !== "success") {
    return { error: "Payment hasn't been confirmed yet. Please wait a moment and refresh." };
  }
  if (!payment.customerEmail) {
    return { error: "Something went wrong with this payment record. Contact support." };
  }

  const parsed = registrationSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { fieldErrors };
  }

  const existingEmail = await prisma.user.findUnique({ where: { email: payment.customerEmail } });
  if (existingEmail) {
    return { error: "An account with this email already exists — log in instead." };
  }
  const existingUsername = await prisma.user.findUnique({ where: { username: parsed.data.username } });
  if (existingUsername) {
    return { fieldErrors: { username: "That username is taken." } };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: payment.customerEmail,
      username: parsed.data.username,
      phone: parsed.data.phone,
      country: parsed.data.country,
      passwordHash,
      activePackage: payment.packageId,
      status: "registered",
      inviteId: invite.id,
    },
  });

  await prisma.$transaction([
    prisma.payment.update({ where: { id: payment.id }, data: { userId: user.id } }),
    prisma.invite.update({ where: { id: invite.id }, data: { status: "used" } }),
  ]);

  await setSession({ userId: user.id, email: user.email });
  redirect(await sectionUrl("dashboard", "/dashboard"));
}
