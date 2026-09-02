import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { LiquidGlass } from "@/components/LiquidGlass";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { watchCategories, watchSteps, watchExamples } from "@/lib/content/watch-and-earn";

export function WatchAndEarn() {
  return (
    <section id="watch-and-earn" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <Badge dot>WATCH &amp; EARN</Badge>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Earn up to <span className="text-gradient-gold">$12 daily</span> watching
            your favorite videos
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Across categories: content creator videos, music videos, AI
            videos, dance videos, comedy videos, and more.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {watchCategories.map((cat) => (
              <li
                key={cat.label}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                <cat.icon size={14} className="text-gold-400" />
                {cat.label}
              </li>
            ))}
          </ul>

          <StaggerGroup className="mt-8 space-y-3">
            {watchSteps.map((step, i) => (
              <StaggerItem
                key={step.title}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-xs font-extrabold text-gold-400">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-6 flex flex-wrap gap-3">
            {watchExamples.map((ex) => (
              <span
                key={ex.duration}
                className="rounded-full border border-money-500/30 bg-money-500/10 px-3.5 py-1.5 text-xs font-semibold text-money-500"
              >
                {ex.duration} = {ex.amount}
              </span>
            ))}
          </div>

          <ButtonLink href="/signup" variant="cta" className="mt-8">
            Join us now
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_rgba(238,171,14,0.4)]">
            <LiquidGlass
              src="/brand/carousel/watch-earn.jpg"
              alt="Jovia member earning by watching videos on her phone"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
