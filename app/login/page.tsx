import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Log in — Jovia Network" };

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your Jovia account.">
      <LoginForm />
    </AuthLayout>
  );
}
