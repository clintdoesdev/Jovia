import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Log in — Jovia Network" };

export default function LoginPage() {
  return (
    <AuthSplitLayout
      badge="MEMBER PORTAL"
      title="Welcome back to Jovia"
      description="Log in with the email and password you used to create your account."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}
