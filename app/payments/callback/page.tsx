import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { telegramVendorUrl } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Payment Status",
  robots: { index: false, follow: false },
};

const copy = {
  success: {
    icon: CheckCircle2,
    color: "text-money-500",
    title: "Payment confirmed",
    body: "Your package is active. Message our vendor on Telegram to finish setting up your account.",
  },
  pending: {
    icon: Clock,
    color: "text-gold-400",
    title: "Confirming your payment",
    body: "KoraPay is still processing this transaction. This page will reflect the final status shortly — refresh in a moment, or reach out on Telegram if it's been a while.",
  },
  failed: {
    icon: XCircle,
    color: "text-red-400",
    title: "Payment not completed",
    body: "This payment didn't go through. No charge should have been made — you can try again from the payment page.",
  },
} as const;

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  const payment = reference
    ? await prisma.payment.findUnique({ where: { reference } })
    : null;

  const state = !payment ? "pending" : payment.status === "success" ? "success" : payment.status === "pending" ? "pending" : "failed";
  const { icon: Icon, color, title, body } = copy[state];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Payment"
          badge="PAYMENT STATUS"
          title="Payment status"
          description="Here's where things stand with your KoraPay transaction."
        />
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <Icon size={48} className={`mx-auto ${color}`} />
          <h2 className="mt-5 text-2xl font-bold text-foreground">{title}</h2>
          <p className="mt-3 text-muted">{body}</p>

          <div className="mt-8 flex flex-col items-center gap-3">
            {state === "success" ? (
              <ButtonLink href={telegramVendorUrl} variant="cta" className="w-full sm:w-auto">
                Continue on Telegram
              </ButtonLink>
            ) : (
              <ButtonLink href="/payments" variant="cta" className="w-full sm:w-auto">
                {state === "pending" ? "Back to payment page" : "Try again"}
              </ButtonLink>
            )}
            <Link href="/dashboard" className="text-sm text-muted-soft hover:text-foreground">
              Go to my dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
