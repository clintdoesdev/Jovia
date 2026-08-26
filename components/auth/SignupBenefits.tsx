const benefits = [
  "Earn rewards across four membership tiers",
  "Free to join, no card required",
  "Track everything from your member dashboard",
  "Cancel or pause anytime",
];

export function SignupBenefits() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <h2 className="text-lg font-semibold text-foreground">
        What you get with Jovia
      </h2>
      <p className="mt-2 text-sm text-muted">
        Everything you need to start earning, in one membership.
      </p>

      <ul className="mt-6 space-y-3.5">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-muted">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-money-500/15 text-xs text-money-500">
              ✓
            </span>
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-xl border border-border-soft bg-ink-raised p-4">
        <p className="text-sm text-muted">
          Already a member?{" "}
          <a href="/login" className="font-semibold text-gold-400 hover:underline">
            Log in to your dashboard
          </a>
          .
        </p>
      </div>
    </div>
  );
}
