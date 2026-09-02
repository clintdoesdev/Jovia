import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { playSteps, playNote } from "@/lib/content/play-and-earn";

export function PlayAndEarn() {
  return (
    <section id="play-and-earn" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_rgba(168,85,247,0.5)]">
            <Image
              src="/brand/carousel/play-earn.jpg"
              alt="Earn up to $20 daily playing games, rewarded by gameplay time"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 384px, 90vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Badge dot>PLAY &amp; EARN</Badge>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Earn up to <span className="text-gradient-gold">$20 daily</span> playing
            your favorite games
          </h2>
          <p className="mt-4 max-w-md text-muted">{playNote}</p>

          <StaggerGroup className="mt-8 space-y-3">
            {playSteps.map((step, i) => (
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

          <ButtonLink href="/signup" variant="cta" className="mt-8">
            Join us now
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
