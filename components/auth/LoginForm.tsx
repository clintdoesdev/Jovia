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
    <div>
      <h2 className="text-2xl font-bold text-foreground">Log in</h2>
      <p className="mt-1.5 text-sm text-muted">
        Enter your email and password to access your dashboard.
      </p>

      <form action={formAction} className="mt-7 space-y-5">
        <FormField
          label="Email"
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
          autoComplete="current-password"
          placeholder="••••••••"
          error={state.fieldErrors?.password}
        />

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}

        <Button type="submit" variant="cta" className="w-full py-3.5 text-base" disabled={pending}>
          {pending ? "Logging in…" : "Log in"}
        </Button>

        <p className="text-center text-sm text-muted-soft">
          Need an account?{" "}
          <Link href="/signup" className="font-medium text-gold-400 hover:underline">
            Join us now
          </Link>
        </p>
      </form>
    </div>
  );
}
