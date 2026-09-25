import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { getCurrentUser } from "@/lib/session";
import { membershipPackages } from "@/lib/config/tiers";
import { PaymentPackageCard } from "@/components/payment/PaymentPackageCard";

export const metadata: Metadata = {
  title: "Pay for Your Jovia Package",
  description: "Pay securely for your Jovia Silver or Gold package with KoraPay. A 1.5% KoraPay charge is added to the access fee.",
  robots: { index: false, follow: false },
};

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const user = await getCurrentUser();
  const { package: preselected } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Payment"
          badge="ACTIVATE YOUR PACKAGE"
          title="Pay for your Jovia package"
          description="Choose Silver or Gold and complete payment securely with KoraPay."
        />
        <div className="mx-auto grid max-w-4xl gap-6 px-6 py-16 sm:grid-cols-2">
          {membershipPackages.map((pkg) => (
            <PaymentPackageCard
              key={pkg.id}
              pkg={pkg}
              defaultSelected={pkg.id === preselected}
              loggedIn={Boolean(user)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
