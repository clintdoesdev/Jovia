"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { membershipPackages } from "@/lib/config/tiers";
import { initializeKorapayCharge } from "@/lib/korapay";
import { siteConfig } from "@/lib/site-config";

export type PaymentActionState = { error?: string; fieldErrors?: Record<string, string> };

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
});

// No login required — /payments is also the entry point for people who
// don't have a Jovia account yet. A logged-in visitor pays under their own
// account (Payment.userId set immediately); an anonymous visitor pays under
// the name/email they enter here, and finishes account setup with the
// vendor on Telegram afterward (see the /payments/callback success state).
export async function initializePaymentAction(
  _prevState: PaymentActionState,
  formData: FormData,
): Promise<PaymentActionState> {
  const pkg = membershipPackages.find((p) => p.id === formData.get("packageId"));
  if (!pkg) {
    return { error: "Choose a valid package." };
  }

  const user = await getCurrentUser();

  let customerName: string;
  let customerEmail: string;

  if (user) {
    customerName = user.name;
    customerEmail = user.email;
  } else {
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
      return { fieldErrors };
    }
    customerName = parsed.data.name;
    customerEmail = parsed.data.email;
  }

  const reference = `JOVIA-${randomUUID()}`;

  await prisma.payment.create({
    data: {
      userId: user?.id,
      packageId: pkg.id,
      amount: pkg.totalNaira,
      currency: "NGN",
      reference,
      status: "pending",
      customerName,
      customerEmail,
    },
  });

  const result = await initializeKorapayCharge({
    amount: pkg.totalNaira,
    currency: "NGN",
    reference,
    customerName,
    customerEmail,
    narration: `${pkg.name} package activation`,
    redirectUrl: `${siteConfig.url}/payments/callback?reference=${reference}`,
    notificationUrl: `${siteConfig.url}/api/payments/webhook`,
  });

  if (!result.ok) {
    return { error: result.message };
  }

  redirect(result.checkoutUrl);
}
