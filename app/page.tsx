import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { LiquidGlassShowcase } from "@/components/LiquidGlassShowcase";
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
import { faqJsonLd, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "Jovia Website | Official Home of Jovia Network";
const description =
  "Welcome to the official Jovia website — home of Jovia Network. Choose the Silver (₦9,000) or Gold (₦15,000) package, watch videos, play games, and earn every second.";

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

const homeImages = [
  { url: absoluteUrl("/brand/hero-art.jpg"), width: 1280, height: 1280 },
  { url: absoluteUrl("/brand/carousel/welcome.jpg"), width: 800, height: 1000 },
  { url: absoluteUrl("/brand/carousel/watch-earn.jpg"), width: 800, height: 1000 },
  { url: absoluteUrl("/brand/carousel/play-earn.jpg"), width: 800, height: 1000 },
  { url: absoluteUrl("/brand/carousel/friday-bonus.jpg"), width: 800, height: 1000 },
  { url: absoluteUrl("/brand/carousel/why-choose-us.jpg"), width: 800, height: 1000 },
];

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: siteConfig.url,
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: homeImages[0].url,
    width: homeImages[0].width,
    height: homeImages[0].height,
  },
  image: homeImages.map((img) => img.url),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <LiquidGlassShowcase />
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
      <JsonLd id="home-webpage-jsonld" data={webPageJsonLd} />
      <JsonLd id="home-faq-jsonld" data={faqJsonLd(homeFaqs.map((f) => ({ q: f.q, a: f.a })))} />
    </>
  );
}
