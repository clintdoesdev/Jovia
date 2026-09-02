import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { aboutJovia } from "@/lib/content/about-jovia";

export function IntroSection() {
  return (
    <section id="who-we-are" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <Badge dot>WELCOME TO JOVIA</Badge>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            {aboutJovia.acronym}
          </h2>
          <div className="mt-6 space-y-4">
            {aboutJovia.paragraphs.map((p) => (
              <p key={p} className="text-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-soft">
              {aboutJovia.visionLabel}
            </p>
            <p className="mt-2 text-2xl font-extrabold text-gradient-gold">
              {aboutJovia.vision}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">{aboutJovia.priority}</p>
            <div className="mt-6 rounded-xl border border-border-soft bg-ink-raised p-4">
              <p className="text-sm text-muted">{aboutJovia.mission}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
