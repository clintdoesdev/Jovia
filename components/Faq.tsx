"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "What is Jovia Network?",
    a: "Jovia is a membership platform. This is placeholder copy — replace it with Jovia's real value proposition when it's ready.",
  },
  {
    q: "How do I join?",
    a: "Create a free account, then start a session whenever you're ready to begin earning toward a reward tier.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Membership is free to join with no long-term commitment.",
  },
  {
    q: "How are reward tiers calculated?",
    a: "Placeholder mechanic — the amounts and durations shown across the site mirror the brand reference and will be replaced with the real reward logic.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading badge="QUESTIONS" title="Jovia, answered" />

        <div className="mt-12 divide-y divide-border-soft rounded-2xl border border-border bg-surface">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="px-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                      open
                        ? "border-gold-500 text-gold-400"
                        : "border-border text-muted-soft"
                    }`}
                  >
                    {open ? "×" : "+"}
                  </span>
                </button>
                {open && (
                  <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
