"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const stats = [
  { value: "$2–$12", label: "Reward range per session" },
  { value: "Free", label: "To join, no card required" },
  { value: "24/7", label: "Member access" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border-soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-glow)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      {/* Ambient drifting orbs */}
      <motion.div
        aria-hidden
        className="glow-orb pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="glow-orb pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl"
        animate={reduce ? undefined : { x: [0, -24, 0], y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <StaggerGroup className="relative mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24 lg:pb-24">
        <div>
          <StaggerItem>
            <Badge dot>THE OFFICIAL JOVIA WEBSITE</Badge>
          </StaggerItem>

          <StaggerItem>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Jovia Website —{" "}
              <span className="text-gradient-gold">Every Second</span> Creates
              Value
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Welcome to the official Jovia website — home of Jovia Network, a
              membership platform where staying active keeps paying off.
              Placeholder copy: swap in Jovia&apos;s real value proposition
              whenever it&apos;s ready.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup" variant="cta" className="px-7 py-3.5 text-base">
              Join us now
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="ghost" className="px-7 py-3.5 text-base">
              How it works
            </ButtonLink>
          </StaggerItem>

          <StaggerItem className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border-soft pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-gold-400 sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-soft sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </StaggerItem>
        </div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_rgba(168,85,247,0.5)]"
          >
            <Image
              src="/brand/hero-art.jpg"
              alt="Jovia Network logo over a purple and gold abstract background"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 90vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
          </motion.div>
        </motion.div>
      </StaggerGroup>
    </section>
  );
}
