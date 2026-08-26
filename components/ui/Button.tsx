import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "cta" | "glow" | "ghost";

const variantClasses: Record<Variant, string> = {
  cta: "btn-shine bg-[image:var(--gradient-cta)] text-ink shadow-[0_8px_30px_-8px_rgba(238,171,14,0.65)] hover:brightness-105 hover:-translate-y-0.5",
  glow: "btn-shine bg-[image:var(--gradient-button)] text-foreground shadow-[0_8px_30px_-8px_rgba(168,85,247,0.65)] hover:brightness-110 hover:-translate-y-0.5",
  ghost:
    "border border-border text-foreground hover:border-violet-500 hover:text-violet-400 hover:-translate-y-0.5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 active:scale-[0.98]";

export function Button({
  variant = "cta",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "cta",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}
