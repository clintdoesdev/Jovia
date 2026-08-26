"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction, type ActionState } from "@/lib/actions/auth";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <FormField label="Full name" name="name" autoComplete="name" error={state.fieldErrors?.name} />
      <FormField label="Email" name="email" type="email" autoComplete="email" error={state.fieldErrors?.email} />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        error={state.fieldErrors?.password}
      />

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <Button type="submit" variant="cta" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-violet-400 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
