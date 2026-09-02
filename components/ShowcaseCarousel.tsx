import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ImageCarousel } from "@/components/carousel/ImageCarousel";

export function ShowcaseCarousel() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Reveal>
        <SectionHeading
          badge="EVERY WAY TO EARN"
          title="Everything Jovia unlocks"
          description="From your first sign-up to Friday Bonus Rewards — tap a card or let it rotate."
        />
      </Reveal>

      <div className="relative mt-14">
        <ImageCarousel />
      </div>
    </section>
  );
}
