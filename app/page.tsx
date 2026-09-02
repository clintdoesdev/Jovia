import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";
import { FridayBonusSection } from "@/components/FridayBonusSection";
import { IntroSection } from "@/components/IntroSection";
import { WatchAndEarn } from "@/components/WatchAndEarn";
import { PlayAndEarn } from "@/components/PlayAndEarn";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HowItWorks } from "@/components/HowItWorks";
import { TiersSection } from "@/components/TiersSection";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs } from "@/lib/content/faq";
import { faqJsonLd } from "@/lib/seo";

const title = "Jovia Website | Official Home of Jovia Network";
const description =
  "Welcome to the official Jovia website — home of Jovia Network. Watch videos, play games, and earn every second, plus weekly Friday Bonus Rewards (FBR).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <ShowcaseCarousel />
        <FridayBonusSection />
        <IntroSection />
        <WatchAndEarn />
        <PlayAndEarn />
        <WhyChooseUs />
        <HowItWorks />
        <TiersSection />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <JsonLd id="home-faq-jsonld" data={faqJsonLd(homeFaqs.map((f) => ({ q: f.q, a: f.a })))} />
    </>
  );
}
