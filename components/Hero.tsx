"use client";

import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { membershipTiers } from "@/lib/config/tiers";

const tilePositions = [
  "md:col-start-2 md:row-start-1", // top
  "md:col-start-1 md:row-start-2", // left
  "md:col-start-3 md:row-start-2", // right
  "md:col-start-2 md:row-start-3", // bottom
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-glow)]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <span className="rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-400">
          MEMBERSHIP · REWARDS · COMMUNITY
        </span>

        <div className="mt-14 grid w-full max-w-xl grid-cols-1 grid-rows-4 gap-4 md:grid-cols-3 md:grid-rows-3 md:gap-6">
          {membershipTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex flex-col items-center justify-center rounded-2xl border border-border bg-surface/80 px-5 py-6 shadow-[0_0_40px_-20px_rgba(168,85,247,0.8)] ${tilePositions[i]}`}
            >
              <span className="text-3xl font-extrabold text-money-500">
                {tier.amount}
              </span>
              <span className="mt-1 text-sm font-medium text-muted">
                {tier.duration}
              </span>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-3 md:col-start-2 md:row-start-2"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px 0px rgba(217,70,239,0.5)",
                  "0 0 40px 12px rgba(217,70,239,0.5)",
                  "0 0 0px 0px rgba(217,70,239,0.5)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-28 w-28 items-center justify-center rounded-full bg-[image:var(--gradient-button)] text-center text-sm font-bold leading-tight text-foreground"
            >
              Press
              <br />
              Start
            </motion.div>
            <p className="text-xs text-muted-soft">to activate countdown</p>
          </motion.div>
        </div>

        <h1 className="mt-16 max-w-2xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Every Second{" "}
          <span className="bg-[image:var(--gradient-cta)] bg-clip-text text-transparent">
            Creates Value
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
          Jovia Network is a membership platform where staying active keeps
          paying off. Placeholder copy — swap in your real value proposition
          whenever it&apos;s ready.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/signup" variant="cta" className="px-8 py-3.5 text-base">
            Join us now
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="ghost" className="px-8 py-3.5 text-base">
            See how it works
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
