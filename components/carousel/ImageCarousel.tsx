"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { carouselCards as cards } from "@/lib/content/carousel";

const RADIUS_X = 280;
const RADIUS_Y = 46;
const AUTO_ROTATE_MS = 4200;

function getCardTransform(index: number, activeIndex: number, count: number) {
  let offset = index - activeIndex;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;

  const angle = offset * ((2 * Math.PI) / count);
  const depth = (Math.cos(angle) + 1) / 2; // 1 = front-facing, 0 = directly behind

  return {
    x: Math.sin(angle) * RADIUS_X,
    y: -(1 - depth) * RADIUS_Y,
    scale: 0.56 + depth * 0.44,
    opacity: 0.3 + depth * 0.7,
    blur: (1 - depth) * 5,
    zIndex: Math.round(depth * 100),
  };
}

export function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = cards.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduceMotion || isPaused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion, isPaused, count]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const active = cards[activeIndex];

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-32 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]"
      />

      <div
        className="relative mx-auto h-[300px] scale-[0.62] sm:h-[380px] sm:scale-[0.85] lg:h-[420px] lg:scale-100"
        style={{ perspective: 1200 }}
      >
        {cards.map((card, index) => {
          const { x, y, scale, opacity, blur, zIndex } = getCardTransform(index, activeIndex, count);
          const isActive = index === activeIndex;

          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${card.title}`}
              aria-current={isActive}
              className="absolute left-1/2 top-1/2 h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[28px] border border-white/10 text-left shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 sm:h-[380px] sm:w-[290px]"
              style={{ zIndex }}
              animate={{ x, y, scale, opacity, filter: `blur(${blur}px)` }}
              initial={false}
              transition={
                reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 }
              }
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(min-width: 640px) 290px, 260px"
                className="object-cover"
                priority={index === 0}
              />
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-300 ${
                  isActive ? "opacity-50" : "opacity-80"
                }`}
              />
              <span className="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-wide text-gold-400">
                {card.eyebrow}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {cards.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${card.title}`}
            aria-current={index === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-gold-400" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="relative mx-auto mt-8 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-border bg-surface p-6 text-center backdrop-blur-xl sm:p-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-ink-raised px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-400">
              {active.eyebrow}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">{active.title}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {active.description}
            </p>
            <Link
              href={active.href}
              className="btn-shine mt-5 inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-cta)] px-6 py-3 text-sm font-semibold text-ink"
            >
              {active.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
