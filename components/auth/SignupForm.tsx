"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { signupAction, type ActionState } from "@/lib/actions/auth";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <form action={formAction} className="space-y-5">
        {state.error && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

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

        <Button type="submit" variant="cta" className="w-full py-3.5 text-base" disabled={pending}>
          {pending ? "Creating account…" : "Create Jovia account"}
        </Button>

        <p className="text-center text-xs text-muted-soft">
          By registering, you agree to Jovia&apos;s Terms of Service and
          Privacy Policy.
        </p>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-gold-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
