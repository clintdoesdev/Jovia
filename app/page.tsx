import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { IntroSection } from "@/components/IntroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { TiersSection } from "@/components/TiersSection";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <IntroSection />
        <FeatureGrid />
        <HowItWorks />
        <TiersSection />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
