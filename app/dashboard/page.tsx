import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/Logo";
import { membershipTiers } from "@/lib/config/tiers";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Dashboard — Jovia Network" };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-border-soft/60 px-6 py-4">
        <Logo />
        <form action={logoutAction}>
          <Button type="submit" variant="ghost">
            Log out
          </Button>
        </form>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-muted">
          This is a placeholder member dashboard — build out the real
          membership experience here.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              className="rounded-2xl border border-border bg-surface/60 px-5 py-8 text-center"
            >
              <span className="text-3xl font-extrabold text-money-500">
                {tier.amount}
              </span>
              <p className="mt-1 text-sm text-muted">every {tier.duration.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
