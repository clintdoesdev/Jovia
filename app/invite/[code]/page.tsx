import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";
import { checkInviteValidity } from "@/lib/invites";
import { membershipPackages } from "@/lib/config/tiers";
import { InvitePaymentForm } from "@/components/invite/InvitePaymentForm";
import { ButtonLink } from "@/components/ui/Button";
import { telegramVendorUrl } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "You're Invited to Jovia",
  robots: { index: false, follow: false },
};

const invalidCopy = {
  not_found: "This invite link doesn't exist. Double-check the link you were sent.",
  used: "This invite link has already been used to register.",
  revoked: "This invite link has been revoked.",
  expired: "This invite link has expired.",
} as const;

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const invite = await prisma.invite.findUnique({ where: { code } });
  const validity = checkInviteValidity(invite);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Invite"
          badge="YOU'RE INVITED"
          title="Activate your Jovia package"
          description="This is a private invite link — complete your payment below to get started."
        />
        <div className="mx-auto max-w-md px-6 py-16">
          {validity.ok ? (
            <InvitePaymentForm
              code={code}
              presetPackage={membershipPackages.find((p) => p.id === invite!.packageId) ?? null}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="text-muted">{invalidCopy[validity.reason]}</p>
              <ButtonLink href={telegramVendorUrl} variant="cta" className="mt-6">
                Message us on Telegram
              </ButtonLink>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
