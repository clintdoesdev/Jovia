import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { InviteRegistrationForm } from "@/components/invite/InviteRegistrationForm";

export const metadata: Metadata = {
  title: "Complete Your Registration",
  robots: { index: false, follow: false },
};

export default async function InviteRegisterPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ reference?: string }>;
}) {
  const { code } = await params;
  const { reference } = await searchParams;

  const invite = await prisma.invite.findUnique({ where: { code } });
  const payment = reference ? await prisma.payment.findUnique({ where: { reference } }) : null;

  let body: React.ReactNode;

  if (invite?.status === "used") {
    body = (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-muted">This invite has already been used to register.</p>
        <ButtonLink href="/login" variant="cta" className="mt-6">
          Log in instead
        </ButtonLink>
      </div>
    );
  } else if (!payment || payment.inviteId !== invite?.id) {
    body = (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-muted">We couldn&apos;t find that payment. Please start again from your invite link.</p>
        <ButtonLink href={`/invite/${code}`} variant="cta" className="mt-6">
          Back to invite
        </ButtonLink>
      </div>
    );
  } else if (payment.status === "pending") {
    body = (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <Clock size={40} className="mx-auto text-gold-400" />
        <h2 className="mt-4 text-lg font-semibold text-foreground">Confirming your payment</h2>
        <p className="mt-2 text-muted">
          KoraPay is still processing this transaction. Refresh in a moment to continue.
        </p>
        <ButtonLink href={`/invite/${code}/register?reference=${reference}`} variant="cta" className="mt-6">
          Refresh
        </ButtonLink>
      </div>
    );
  } else if (payment.status === "failed") {
    body = (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-muted">This payment didn&apos;t go through. No charge should have been made.</p>
        <ButtonLink href={`/invite/${code}`} variant="cta" className="mt-6">
          Try again
        </ButtonLink>
      </div>
    );
  } else {
    body = (
      <InviteRegistrationForm
        code={code}
        reference={reference!}
        defaultName={payment.customerName ?? ""}
        email={payment.customerEmail ?? ""}
      />
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Complete Registration"
          badge="PAYMENT RECEIVED"
          title="Complete your registration"
          description="Just a few more details to open your Jovia account."
        />
        <div className="mx-auto max-w-md px-6 py-16">{body}</div>
      </main>
      <Footer />
    </>
  );
}
