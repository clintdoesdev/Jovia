import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { whyChooseUs } from "@/lib/content/why-choose-us";

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            badge="WHY CHOOSE US"
            title="Why choose Jovia"
            description="What members can count on from Jovia Network, every day."
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <StaggerItem
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 sm:text-left"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 sm:mx-0">
                <item.icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
