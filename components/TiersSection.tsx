import { membershipTiers } from "@/lib/config/tiers";
import { ButtonLink } from "@/components/ui/Button";

export function TiersSection() {
  return (
    <section id="tiers" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Membership tiers
          </h2>
          <p className="mt-4 text-muted">
            Placeholder tier structure — the amounts and durations here
            mirror the brand reference and are meant to be replaced with
            real numbers.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface/60 px-6 py-10 text-center transition hover:border-violet-500/60"
            >
              <span className="text-4xl font-extrabold text-money-500">
                {tier.amount}
              </span>
              <span className="text-sm font-medium text-muted">
                every {tier.duration.toLowerCase()}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/signup" variant="cta" className="px-8 py-3.5 text-base">
            Join us now
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
