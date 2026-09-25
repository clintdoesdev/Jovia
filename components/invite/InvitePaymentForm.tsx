"use client";

import { useActionState, useState } from "react";
import { initializeInvitePaymentAction, type ActionState } from "@/lib/actions/invite-flow";
import { FieldInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { PriceBreakdown } from "@/components/payment/PriceBreakdown";
import { membershipPackages, type MembershipPackage } from "@/lib/config/tiers";

const initialState: ActionState = {};

export function InvitePaymentForm({
  code,
  presetPackage,
}: {
  code: string;
  presetPackage: MembershipPackage | null;
}) {
  const [state, formAction, pending] = useActionState(initializeInvitePaymentAction, initialState);
  const [selectedId, setSelectedId] = useState(presetPackage?.id ?? membershipPackages[0].id);
  const pkg = presetPackage ?? membershipPackages.find((p) => p.id === selectedId)!;

  return (
    <form action={formAction} className="rounded-2xl border border-border bg-surface p-6">
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="packageId" value={pkg.id} />

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-money-500">{pkg.accessFee}</span>
        <span className="text-sm text-muted">one-time access fee</span>
      </div>
      <p className="mt-1 text-sm font-semibold text-gold-400">
        {pkg.perSecond}/sec · {pkg.per20Seconds} every 20 seconds
      </p>
      <PriceBreakdown pkg={pkg} className="mt-4 rounded-xl border border-border-soft p-4" />

      {!presetPackage && (
        <div className="mt-5">
          <label htmlFor="package-choice" className="block text-sm font-medium text-foreground">
            Choose your package
          </label>
          <select
            id="package-choice"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-ink-raised px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-violet-500"
          >
            {membershipPackages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.accessFee} + {p.korapayCharge} KoraPay charge)
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-soft">This sets the charge above.</p>
        </div>
      )}

      <div className="mt-5 space-y-4">
        <FieldInput label="Full name" name="name" placeholder="Ada Lovelace" required error={state.fieldErrors?.name} />
        <FieldInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          error={state.fieldErrors?.email}
        />
      </div>

      {state.error && <p className="mt-4 text-sm text-red-400">{state.error}</p>}
      {state.fieldErrors?.packageId && (
        <p className="mt-2 text-sm text-red-400">{state.fieldErrors.packageId}</p>
      )}

      <Button type="submit" variant="cta" className="mt-6 w-full py-3.5 text-base" disabled={pending}>
        {pending ? "Starting payment…" : `Pay ${pkg.totalCharge} with KoraPay`}
      </Button>
    </form>
  );
}
