import { SectionHeading } from "@/components/ui/SectionHeading";
import { platformFeatures as features } from "@/lib/content/features";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function FeatureGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            badge="THE JOVIA ECOSYSTEM"
            title="One membership. Ever more ways to earn."
            description="Jovia combines active-session rewards, member perks, and community into one ecosystem — everything you need in one account."
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                <feature.icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
