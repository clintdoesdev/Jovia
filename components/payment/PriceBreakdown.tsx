import type { MembershipPackage } from "@/lib/config/tiers";

// Access fee + KoraPay charge = total, shown wherever a package price
// appears so the amount on KoraPay's checkout never comes as a surprise.
export function PriceBreakdown({
  pkg,
  className = "",
}: {
  pkg: MembershipPackage;
  className?: string;
}) {
  return (
    <dl className={`space-y-1 text-sm ${className}`}>
      <div className="flex justify-between gap-3">
        <dt className="text-muted">Access fee</dt>
        <dd className="text-foreground">{pkg.accessFee}</dd>
      </div>
      <div className="flex justify-between gap-3">
        <dt className="text-muted">KoraPay charge</dt>
        <dd className="text-foreground">+{pkg.korapayCharge}</dd>
      </div>
      <div className="flex justify-between gap-3 border-t border-border-soft pt-1 font-semibold">
        <dt className="text-foreground">Total</dt>
        <dd className="text-money-500">{pkg.totalCharge}</dd>
      </div>
    </dl>
  );
}
