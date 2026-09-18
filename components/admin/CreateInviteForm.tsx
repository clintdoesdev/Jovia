"use client";

import { useActionState } from "react";
import { createInviteAction, type ActionState } from "@/lib/actions/admin";
import { FieldInput, FieldSelect } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { membershipPackages } from "@/lib/config/tiers";

const initialState: ActionState = {};

export function CreateInviteForm() {
  const [state, formAction, pending] = useActionState(createInviteAction, initialState);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold text-foreground">Create an invite</h2>
      <form action={formAction} className="mt-5 space-y-4">
        <FieldInput label="Note (optional)" name="note" placeholder="e.g. Ada Lovelace" />
        <FieldSelect
          label="Payment plan (optional)"
          name="packageId"
          defaultValue=""
          options={[
            { value: "", label: "Not set" },
            ...membershipPackages.map((p) => ({ value: p.id, label: `${p.name} (${p.accessFee})` })),
          ]}
          hint="Pre-assigns a plan to whoever registers with this link. Leave not set to let them choose."
        />
        <FieldInput
          label="Expires after (days)"
          name="expiresAfterDays"
          type="number"
          placeholder="Never expires"
          error={state.fieldErrors?.expiresAfterDays}
        />
        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        <Button type="submit" variant="cta" className="w-full" disabled={pending}>
          {pending ? "Generating…" : "Generate invite link"}
        </Button>
      </form>
    </div>
  );
}
