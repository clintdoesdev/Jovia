import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

const stats = [
  { value: "$2–$12", label: "Reward range per session" },
  { value: "Free", label: "To join, no card required" },
  { value: "24/7", label: "Member access" },
];

export function Hero() {
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

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24 lg:pb-24">
        <div>
          <Badge dot>THE OFFICIAL JOVIA WEBSITE</Badge>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Jovia Network —{" "}
            <span className="bg-[image:var(--gradient-cta)] bg-clip-text text-transparent">
              Every Second
            </span>{" "}
            Creates Value
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Welcome to the official Jovia Network website — a membership
            platform where staying active keeps paying off. Placeholder copy:
            swap in Jovia&apos;s real value proposition whenever it&apos;s ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup" variant="cta" className="px-7 py-3.5 text-base">
              Join us now
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="ghost" className="px-7 py-3.5 text-base">
              How it works
            </ButtonLink>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border-soft pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-gold-400 sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-soft sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_rgba(168,85,247,0.5)]">
          <Image
            src="/brand/hero-art.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 420px, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
        </div>
      </div>
    </section>
  );
}
