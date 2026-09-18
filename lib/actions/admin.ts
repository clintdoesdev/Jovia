"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { generateInviteCode } from "@/lib/invites";
import { membershipPackages } from "@/lib/config/tiers";
import { sectionUrl } from "@/lib/subdomain";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect(await sectionUrl("admin", "/login?next=/admin"));
  if (!user.isAdmin) redirect(await sectionUrl("dashboard", "/dashboard"));
  return user;
}

export type ActionState = { error?: string; fieldErrors?: Record<string, string> };

export async function createInviteAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const note = String(formData.get("note") ?? "").trim() || null;
  const packageId = String(formData.get("packageId") ?? "").trim() || null;
  if (packageId && !membershipPackages.some((p) => p.id === packageId)) {
    return { fieldErrors: { packageId: "Choose a valid package or leave it not set." } };
  }

  const expiresAfterDaysRaw = String(formData.get("expiresAfterDays") ?? "").trim();
  let expiresAt: Date | null = null;
  if (expiresAfterDaysRaw) {
    const days = Number(expiresAfterDaysRaw);
    if (!Number.isFinite(days) || days <= 0) {
      return { fieldErrors: { expiresAfterDays: "Enter a positive number of days." } };
    }
    expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  await prisma.invite.create({
    data: { code: generateInviteCode(), note, packageId, expiresAt },
  });

  revalidatePath("/admin/invites");
  revalidatePath("/admin");
  return {};
}

export async function revokeInviteAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.invite.updateMany({
    where: { id, status: "pending" },
    data: { status: "revoked" },
  });
  revalidatePath("/admin/invites");
  revalidatePath("/admin");
}

export async function updateMemberAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const id = String(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const country = String(formData.get("country") ?? "").trim() || null;
  const activePackage = String(formData.get("activePackage") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "registered");
  const activationDateRaw = String(formData.get("activationDate") ?? "").trim();
  const loginNote = String(formData.get("loginNote") ?? "").trim() || null;
  const adminNote = String(formData.get("adminNote") ?? "").trim() || null;

  if (!name || !email) {
    return { fieldErrors: { name: "Name and email are required." } };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        username,
        phone,
        country,
        activePackage,
        status,
        activationDate: activationDateRaw ? new Date(activationDateRaw) : null,
        loginNote,
        adminNote,
      },
    });
  } catch {
    return { error: "Could not save — that email or username may already be in use." };
  }

  revalidatePath("/admin/members");
  redirect("/admin/members");
}

export async function setMemberStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await prisma.user.update({ where: { id }, data: { status } });
  revalidatePath("/admin/members");
  revalidatePath("/admin");
}

export async function deleteMemberAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.payment.updateMany({ where: { userId: id }, data: { userId: null } });
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/members");
  revalidatePath("/admin");
}
