"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeFaqs as faqs } from "@/lib/content/faq";
import { Reveal } from "@/components/motion/Reveal";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading badge="QUESTIONS" title="Jovia, answered" />
        </Reveal>

        <Reveal delay={0.1}>
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
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        open
                          ? "border-gold-500 text-gold-400"
                          : "border-border text-muted-soft"
                      }`}
                    >
                      <Plus
                        size={13}
                        className={`transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
                      />
                    </span>
                  </button>
                  <div className={`accordion-panel ${open ? "is-open" : ""}`}>
                    <div>
                      <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-sm text-muted-soft">
            Want more detail? See{" "}
            <a href="/jovia-platform" className="font-medium text-gold-400 hover:underline">
              the Jovia platform
            </a>
            , the{" "}
            <a href="/jovia-app" className="font-medium text-gold-400 hover:underline">
              Jovia app
            </a>
            , or{" "}
            <a href="/how-to-register" className="font-medium text-gold-400 hover:underline">
              how to register
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
