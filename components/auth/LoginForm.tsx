"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type ActionState } from "@/lib/actions/auth";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <FormField label="Email" name="email" type="email" autoComplete="email" error={state.fieldErrors?.email} />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        error={state.fieldErrors?.password}
      />

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <Button type="submit" variant="cta" className="w-full" disabled={pending}>
        {pending ? "Logging in…" : "Log in"}
      </Button>

      <p className="text-center text-sm text-muted-soft">
        Need an account?{" "}
        <Link href="/signup" className="font-medium text-violet-400 hover:underline">
          Join us now
        </Link>
      </p>
    </form>
  );
}
