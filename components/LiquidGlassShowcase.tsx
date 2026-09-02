import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { LiquidGlassOrb } from "@/components/LiquidGlassOrb";

export function LiquidGlassShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-border-soft bg-ink-raised">
      <div className="relative h-[360px] w-full sm:h-[420px] lg:h-[480px]">
        <LiquidGlassOrb />
        <Reveal className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="rounded-2xl bg-ink/70 px-6 py-4 backdrop-blur-sm">
            <Badge dot>LIQUID GLASS</Badge>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-soft">
              Every second in motion — droplets that merge, separate, and
              catch the light like glass.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
