"use client";

import { useActionState } from "react";
import { completeInviteRegistrationAction, type ActionState } from "@/lib/actions/invite-flow";
import { FieldInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function InviteRegistrationForm({
  code,
  reference,
  defaultName,
  email,
}: {
  code: string;
  reference: string;
  defaultName: string;
  email: string;
}) {
  const [state, formAction, pending] = useActionState(completeInviteRegistrationAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-border bg-surface p-8">
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="reference" value={reference} />

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground">Email</label>
        <p className="mt-2 rounded-lg border border-border-soft bg-ink-raised px-3.5 py-2.5 text-sm text-muted">
          {email}
        </p>
      </div>

      <FieldInput label="Full name" name="name" defaultValue={defaultName} required error={state.fieldErrors?.name} />
      <FieldInput label="Username" name="username" placeholder="ada" required error={state.fieldErrors?.username} />
      <FieldInput label="Phone" name="phone" placeholder="+234..." required error={state.fieldErrors?.phone} />
      <FieldInput label="Country" name="country" placeholder="Nigeria" required error={state.fieldErrors?.country} />
      <FieldInput
        label="Password"
        name="password"
        type="password"
        placeholder="At least 8 characters"
        required
        error={state.fieldErrors?.password}
      />

      <Button type="submit" variant="cta" className="w-full py-3.5 text-base" disabled={pending}>
        {pending ? "Creating account…" : "Complete registration"}
      </Button>
    </form>
  );
}
