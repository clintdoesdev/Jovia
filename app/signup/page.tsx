import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { SignupBenefits } from "@/components/auth/SignupBenefits";
import { SignupForm } from "@/components/auth/SignupForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Sign up — Jovia Network" };

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
    </>
  );
}
