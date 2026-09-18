import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Send, Calendar, KeyRound } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/Badge";
import { membershipPackages } from "@/lib/config/tiers";
import { Button, ButtonLink } from "@/components/ui/Button";
import { telegramGroupUrl } from "@/lib/telegram";
import { sectionUrl } from "@/lib/subdomain";

export const metadata: Metadata = {
  title: "Dashboard — Jovia Network",
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = {
  registered: "Registered",
  active: "Active",
  suspended: "Suspended",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(await sectionUrl("dashboard", "/login?next=/dashboard"));
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-soft bg-ink/85 px-6 py-4 backdrop-blur-md">
        <Logo />
        <form action={logoutAction}>
          <Button type="submit" variant="ghost">
            Log out
          </Button>
        </form>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <Badge dot>{statusLabel[user.status] ?? user.status}</Badge>
        <h1 className="mt-4 text-3xl font-bold text-foreground">
          {user.status === "registered" ? "You're registered" : `Welcome back, ${user.name.split(" ")[0]}`}
        </h1>
        <p className="mt-2 max-w-lg text-muted">
          {user.status === "registered"
            ? "Your Jovia account is set up. We'll let you know as soon as your membership is active."
            : "This is your Jovia member dashboard."}
        </p>
        {user.username && (
          <p className="mt-2 text-sm text-muted-soft">
            Signed in as {user.name} (@{user.username})
            {user.activePackage && (
              <> · {membershipPackages.find((p) => p.id === user.activePackage)?.name ?? user.activePackage} plan</>
            )}
          </p>
        )}

        <div className="mt-8 space-y-4">
          {user.activationDate && (
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
              <Calendar size={20} className="mt-0.5 shrink-0 text-gold-400" />
              <div>
                <p className="font-semibold text-foreground">Activation date</p>
                <p className="mt-1 text-sm text-muted">
                  Your account will be activated on{" "}
                  {user.activationDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  .
                </p>
              </div>
            </div>
          )}

          {user.loginNote && (
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
              <KeyRound size={20} className="mt-0.5 shrink-0 text-gold-400" />
              <div>
                <p className="font-semibold text-foreground">Login details</p>
                <p className="mt-1 whitespace-pre-line text-sm text-muted">{user.loginNote}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
            <Send size={20} className="mt-0.5 shrink-0 text-gold-400" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">Join the VIP Telegram group</p>
              <p className="mt-1 text-sm text-muted">
                Every Jovia member gets access to our private Telegram group for updates and community.
              </p>
              <ButtonLink href={telegramGroupUrl} variant="cta" className="mt-4">
                Join VIP Telegram Group
              </ButtonLink>
            </div>
          </div>
        </div>

        {!user.activePackage && (
          <>
            <h2 className="mt-10 text-lg font-semibold text-foreground">Activate a package</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              {membershipPackages.map((pkg) => (
                <div key={pkg.id} className="rounded-2xl border border-border bg-surface px-5 py-8 text-center">
                  <p className="text-sm font-semibold text-foreground">{pkg.name}</p>
                  <span className="mt-2 block text-3xl font-extrabold text-money-500">{pkg.accessFee}</span>
                  <p className="mt-1 text-sm text-muted">
                    {pkg.perSecond}/sec · {pkg.per20Seconds} every 20 seconds
                  </p>
                  <ButtonLink href={`/payments?package=${pkg.id}`} variant="cta" className="mt-5 w-full">
                    Pay {pkg.accessFee} with KoraPay
                  </ButtonLink>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
