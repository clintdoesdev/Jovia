import { membershipTiers } from "@/lib/config/tiers";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export function TiersSection() {
  return (
    <section id="tiers" className="relative overflow-hidden border-y border-border-soft px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-banner)] opacity-70"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Badge>MEMBERSHIP</Badge>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Tiers built to grow with you
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Every Jovia membership unlocks the same core rewards. Placeholder
            tier structure — the amounts and durations mirror the brand
            reference and are meant to be replaced with real numbers.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/signup" variant="cta">
              Join us now
            </ButtonLink>
            <ButtonLink href="/#faq" variant="ghost">
              View FAQ
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {membershipTiers.map((tier, i) => {
            const highlighted = i === 2;
            return (
              <div
                key={tier.id}
                className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-8 text-center backdrop-blur-sm ${
                  highlighted
                    ? "border-gold-500/60 bg-ink/60 shadow-[0_0_40px_-12px_rgba(238,171,14,0.55)]"
                    : "border-white/10 bg-ink/40"
                }`}
              >
                {highlighted && (
                  <span className="mb-1 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                    Most popular
                  </span>
                )}
                <span className="text-3xl font-extrabold text-money-500">{tier.amount}</span>
                <span className="text-xs font-medium text-muted">
                  every {tier.duration.toLowerCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
