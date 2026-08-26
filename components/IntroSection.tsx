import { Activity, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: Activity,
    title: "Built around real activity",
    body: "Jovia is designed to reward genuine engagement — not just sign-ups. Placeholder copy, swap in the real mechanic once it's defined.",
  },
  {
    icon: Sparkles,
    title: "A rewarding member ecosystem",
    body: "Every session you complete is combined with tiered rewards, community perks, and account milestones — so staying active keeps paying off.",
  },
];

export function IntroSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="WHO WE ARE"
          title={
            <>
              Jovia connects activity to value —
              <br className="hidden sm:block" /> and pays you for it
            </>
          }
          description="The Jovia website is the official home of the network. Jovia is a membership platform built to turn consistent, everyday engagement into real, tracked rewards."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                <point.icon size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-muted-soft">
          Our vision is simple: turn everyday moments into measurable value —
          and build a network that rewards showing up.
        </p>
      </div>
    </section>
  );
}
