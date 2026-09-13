"use client";

import { useActionState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { initializePaymentAction, type PaymentActionState } from "@/lib/actions/payments";
import type { MembershipPackage } from "@/lib/config/tiers";

const initialState: PaymentActionState = {};

export function PaymentPackageCard({
  pkg,
  defaultSelected = false,
}: {
  pkg: MembershipPackage;
  defaultSelected?: boolean;
}) {
  const [state, formAction, pending] = useActionState(initializePaymentAction, initialState);

  return (
    <div
      className={`flex flex-col rounded-3xl border p-8 ${
        pkg.highlighted || defaultSelected
          ? "border-gold-500/60 bg-ink/60 shadow-[0_0_50px_-14px_rgba(238,171,14,0.55)]"
          : "border-white/10 bg-ink/40"
      }`}
    >
      <h2 className="text-xl font-bold text-foreground">{pkg.name}</h2>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-money-500">{pkg.accessFee}</span>
        <span className="text-sm text-muted">one-time access fee</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-gold-400">
        {pkg.perSecond}/sec · {pkg.per20Seconds} every 20 seconds
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-border-soft pt-6">
        {pkg.earnings.slice(0, 3).map((line) => (
          <li key={line.label} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-money-500/15 text-money-500">
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="text-muted">
              {line.label}: <span className="text-foreground">{line.value}</span>
            </span>
          </li>
        ))}
      </ul>

      <form action={formAction} className="mt-8">
        <input type="hidden" name="packageId" value={pkg.id} />
        {state.error && <p className="mb-3 text-sm text-red-400">{state.error}</p>}
        <Button
          type="submit"
          variant={pkg.highlighted ? "cta" : "ghost"}
          className="w-full"
          disabled={pending}
        >
          {pending ? "Starting payment…" : `Pay ${pkg.accessFee} with KoraPay`}
        </Button>
      </form>
    </div>
  );
}
