import { Check, X } from "lucide-react";
import { membershipPackages, exchangeRate } from "@/lib/config/tiers";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function TiersSection() {
  return (
    <section id="tiers" className="relative overflow-hidden border-y border-border-soft px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-banner)] opacity-70"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>MEMBERSHIP PACKAGES</Badge>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Two packages. Pick your earning rate.
          </h2>
          <p className="mt-4 text-muted">
            Activate Jovia Silver or Jovia Gold to unlock your earning rate
            across every activity. {exchangeRate}.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-2">
          {membershipPackages.map((pkg) => (
            <StaggerItem
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl border p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 ${
                pkg.highlighted
                  ? "border-gold-500/60 bg-ink/60 shadow-[0_0_50px_-14px_rgba(238,171,14,0.55)]"
                  : "border-white/10 bg-ink/40"
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
                  Most popular
                </span>
              )}

              <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-money-500">{pkg.accessFee}</span>
                <span className="text-sm text-muted">one-time access fee</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-gold-400">
                {pkg.perSecond}/sec · {pkg.per20Seconds} every 20 seconds
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-border-soft pt-6">
                {pkg.earnings.map((line) => (
                  <li
                    key={line.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-muted">
                      {line.label}
                      {line.note && (
                        <span className="ml-1.5 text-xs text-muted-soft">({line.note})</span>
                      )}
                    </span>
                    <span className="shrink-0 font-semibold text-foreground">{line.value}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 space-y-2.5 border-t border-border-soft pt-6">
                {pkg.extras.map((line) => {
                  const active = !/not active/i.test(line.value);
                  return (
                    <li key={line.label} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          active
                            ? "bg-money-500/15 text-money-500"
                            : "bg-white/5 text-muted-soft"
                        }`}
                      >
                        {active ? (
                          <Check size={12} strokeWidth={3} />
                        ) : (
                          <X size={12} strokeWidth={3} />
                        )}
                      </span>
                      <span className="text-muted">
                        {line.label}: <span className="text-foreground">{line.value}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <ButtonLink
                href="/signup"
                variant={pkg.highlighted ? "cta" : "ghost"}
                className="mt-8"
              >
                Join with {pkg.name.replace("Jovia ", "")}
              </ButtonLink>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-8 text-center">
          <ButtonLink href="/#faq" variant="ghost">
            View FAQ
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
