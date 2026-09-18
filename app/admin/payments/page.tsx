import { prisma } from "@/lib/prisma";
import { membershipPackages } from "@/lib/config/tiers";
import { ButtonLink } from "@/components/ui/Button";

function packageLabel(packageId: string) {
  return membershipPackages.find((p) => p.id === packageId)?.name ?? packageId;
}

function statusBadge(status: string) {
  const color =
    status === "success"
      ? "bg-money-500/10 text-money-500"
      : status === "failed"
        ? "bg-red-500/10 text-red-400"
        : "bg-gold-500/10 text-gold-400";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${color}`}>
      {status}
    </span>
  );
}

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground">Payments ({payments.length})</h1>
        <ButtonLink href="/admin/payments/export" variant="ghost">
          Export CSV
        </ButtonLink>
      </div>
      <p className="mt-2 text-muted">Every KoraPay checkout attempt — successful, pending, or failed.</p>

      <div className="mt-6 space-y-3">
        {payments.map((payment) => (
          <div key={payment.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center gap-2">
              {statusBadge(payment.status)}
              <span className="rounded-full bg-ink-raised px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">
                {packageLabel(payment.packageId)}
              </span>
              <span className="text-lg font-bold text-money-500">
                ₦{payment.amount.toLocaleString()}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-muted-soft">
              {payment.customerName ?? "Unknown"} · {payment.customerEmail ?? "—"} · ref: {payment.reference}
            </p>
            <p className="mt-1 text-xs text-muted-soft">
              {payment.createdAt.toLocaleString()}
            </p>
          </div>
        ))}
        {payments.length === 0 && <p className="text-sm text-muted-soft">No payments yet.</p>}
      </div>
    </div>
  );
}
