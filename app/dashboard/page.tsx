import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/Badge";
import { membershipPackages } from "@/lib/config/tiers";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dashboard — Jovia Network",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
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

      <main className="mx-auto max-w-5xl px-6 py-16">
        <Badge>MEMBER DASHBOARD</Badge>
        <h1 className="mt-4 text-3xl font-bold text-foreground">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-2 max-w-lg text-muted">
          This is a placeholder member dashboard — build out the real
          membership experience here.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {membershipPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl border border-border bg-surface px-5 py-8 text-center"
            >
              <p className="text-sm font-semibold text-foreground">{pkg.name}</p>
              <span className="mt-2 block text-3xl font-extrabold text-money-500">
                {pkg.accessFee}
              </span>
              <p className="mt-1 text-sm text-muted">
                {pkg.perSecond}/sec · {pkg.per20Seconds} every 20 seconds
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
