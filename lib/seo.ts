import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { membershipPackages } from "@/lib/config/tiers";

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const defaultOgImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: "Jovia Website — every second creates value",
};

// Next.js replaces nested metadata objects wholesale rather than merging
// them: a page that sets `openGraph: { title }` silently drops the root
// layout's og:image, og:site_name, og:type and og:locale, and the same goes
// for `twitter` (the large-image card type and image are lost). Build every
// page's social metadata through here so each one ships the full set.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: path,
      title,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

// One Offer per membership package, priced at what KoraPay actually
// charges (access fee + KoraPay charge) so search results show the same
// total a member pays at checkout.
export function membershipOffersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${siteConfig.url}/#packages`,
    name: "Jovia Membership Packages",
    url: `${siteConfig.url}/#tiers`,
    itemListElement: membershipPackages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: `${pkg.name} membership — earn ${pkg.perSecond} per second. ${pkg.accessFee} access fee + ${pkg.korapayCharge} KoraPay charge.`,
      price: pkg.totalNaira,
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/#tiers`,
      seller: { "@id": `${siteConfig.url}/#organization` },
    })),
  };
}
