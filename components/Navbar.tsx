"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#tiers", label: "Membership" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border-soft bg-ink/90 backdrop-blur-md"
          : "border-transparent bg-ink/60 backdrop-blur-sm"
      }`}
    >
      <nav
        className={`relative mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Logo />
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-sm font-medium text-muted md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="group relative py-1 transition hover:text-foreground">
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ButtonLink href="/login" variant="ghost" className="hidden sm:inline-flex">
            Log in
          </ButtonLink>
          <ButtonLink href="/signup" variant="cta">
            Join Jovia
          </ButtonLink>
        </div>
      </nav>
    </motion.header>
  );
}
