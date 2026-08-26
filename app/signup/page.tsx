import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Join us now — Jovia Network" };

export default function SignupPage() {
  return (
    <AuthLayout title="Create your account" subtitle="Join Jovia Network in under a minute.">
      <SignupForm />
    </AuthLayout>
  );
}
