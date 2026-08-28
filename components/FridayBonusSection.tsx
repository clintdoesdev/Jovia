import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { fridayBonusSteps } from "@/lib/content/friday-bonus";

export function FridayBonusSection() {
  return (
    <section
      id="friday-bonus-rewards"
      className="relative overflow-hidden border-y border-border-soft px-6 py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-banner)] opacity-70"
      />
      <div
        aria-hidden
        className="glow-orb pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <Badge dot>FRIDAY BONUS REWARDS (FBR)</Badge>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Win &amp; withdraw{" "}
            <span className="text-gradient-gold">$10 every Friday</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Every Friday is a chance to win and withdraw a $10 bonus reward —
            on top of your regular Jovia earnings.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 text-left sm:grid-cols-3">
          {fridayBonusSteps.map((step, i) => (
            <StaggerItem
              key={i}
              className="rounded-2xl border border-white/10 bg-ink/50 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-gold-500/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                <step.icon size={19} strokeWidth={2} />
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted">{step.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15}>
          <p className="mt-8 text-xs font-medium uppercase tracking-wide text-gold-400/80">
            Monthly validity applies
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/signup" variant="cta" className="px-8 py-3.5 text-base">
              Join us now
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
