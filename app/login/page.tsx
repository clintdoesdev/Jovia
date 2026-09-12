import type { Metadata } from "next";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Jovia Login";
const description = "Log in to your Jovia account to access your member dashboard.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/login" },
  openGraph: { title, description, url: "/login" },
  twitter: { title, description },
};

export default function LoginPage() {
  return (
    <>
      <AuthSplitLayout
        badge="MEMBER PORTAL"
        title="Welcome back to Jovia"
        description="Log in with the email and password you used to create your account."
      >
        <LoginForm />
      </AuthSplitLayout>
      <JsonLd
        id="login-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Login", path: "/login" },
        ])}
      />
    </>
  );
}
