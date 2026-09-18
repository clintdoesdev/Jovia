"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/invites", label: "Invites" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/payments", label: "Payments" },
];

export function AdminNavTabs() {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-5xl gap-6">
      {tabs.map((tab) => {
        const active = tab.href === "/admin" ? pathname === "/admin" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border-b-2 px-1 py-3.5 text-sm font-medium transition ${
              active
                ? "border-gold-400 text-gold-400"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
