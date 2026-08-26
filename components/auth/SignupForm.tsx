"use client";

import { useActionState } from "react";
import { signupAction, type ActionState } from "@/lib/actions/auth";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <form action={formAction} className="space-y-5">
        <FormField
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          error={state.fieldErrors?.name}
        />
        <FormField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={state.fieldErrors?.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={state.fieldErrors?.password}
        />

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}

        <Button type="submit" variant="cta" className="w-full py-3.5 text-base" disabled={pending}>
          {pending ? "Creating account…" : "Create Jovia account"}
        </Button>

        <p className="text-center text-xs text-muted-soft">
          By registering, you agree to Jovia&apos;s Terms of Service and
          Privacy Policy.
        </p>
      </form>
    </div>
  );
}
