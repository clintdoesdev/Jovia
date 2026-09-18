import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { AdminNavTabs } from "@/components/admin/AdminNavTabs";

export const metadata: Metadata = {
  title: "Jovia Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (!user.isAdmin) redirect("/dashboard");

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

      <nav className="border-b border-border-soft px-6">
        <AdminNavTabs />
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </div>
  );
}
