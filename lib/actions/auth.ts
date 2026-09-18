"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { clearSession, setSession } from "@/lib/session";
import { loginSchema } from "@/lib/validation";
import { sectionUrl } from "@/lib/subdomain";

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  const validPassword = user
    ? await verifyPassword(password, user.passwordHash)
    : false;

  if (!user || !validPassword) {
    return { error: "Invalid email or password" };
  }

  await setSession({ userId: user.id, email: user.email });
  redirect(await sectionUrl("dashboard", "/dashboard"));
}

export async function logoutAction() {
  await clearSession();
  redirect(await sectionUrl("main", "/"));
}

function flattenFieldErrors(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}
