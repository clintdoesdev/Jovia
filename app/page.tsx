import type { Metadata } from "next";
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
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs } from "@/lib/content/faq";
import { faqJsonLd } from "@/lib/seo";

const title = "Jovia Website | Official Home of Jovia Network";
const description =
  "Welcome to the official Jovia website — home of Jovia Network, a membership platform where staying active keeps paying off across four reward tiers.";

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
        <IntroSection />
        <FeatureGrid />
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
