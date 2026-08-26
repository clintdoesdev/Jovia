import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    quote:
      "I joined just to see what it was about and ended up sticking around — the reward tiers make it easy to see exactly what you're earning.",
    name: "Amara O.",
    role: "Jovia member",
  },
  {
    quote:
      "Simple to use and the payouts are exactly what's shown up front. No surprises, which is rare.",
    name: "Daniel K.",
    role: "Jovia member",
  },
  {
    quote:
      "The tier system is a nice touch — staying active for longer sessions actually feels worth it.",
    name: "Priya S.",
    role: "Jovia member",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-gold-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading badge="MEMBER VOICES" title="People earning with Jovia" />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-surface p-6">
              <Stars />
              <p className="mt-4 text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-400">
                  {t.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-soft">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-soft">
          Placeholder testimonials — replace with real member quotes.
        </p>
      </div>
    </section>
  );
}
