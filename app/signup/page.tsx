import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { SignupBenefits } from "@/components/auth/SignupBenefits";
import { SignupForm } from "@/components/auth/SignupForm";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Sign Up for Jovia";
const description =
  "Create your Jovia account in under two minutes and start earning across four membership reward tiers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/signup" },
  openGraph: { title, description, url: "/signup" },
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Sign Up"
          badge="CREATE YOUR ACCOUNT"
          title="Sign up for Jovia"
          description="Enter your details below to create your Jovia account. It takes less than two minutes."
        />
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-2">
          <SignupBenefits />
          <SignupForm />
        </div>
      </main>
      <Footer />
      <JsonLd
        id="signup-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sign Up", path: "/signup" },
        ])}
      />
    </>
  );
}
