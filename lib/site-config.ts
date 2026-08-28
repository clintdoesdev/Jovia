export const siteConfig = {
  name: "Jovia",
  tagline: "Every second creates value",
  url: "https://joviawebsite.com.ng",
  // Feeds Open Graph, Twitter cards, WebSite JSON-LD, and the footer
  // paragraph on every page — keep the phrase "official Jovia website" in
  // here, it's the single highest-value phrase to protect.
  description:
    "The official Jovia website — home of Jovia Network, a membership platform with four reward tiers and weekly Friday Bonus Rewards (FBR).",
  ogImage: "/og-image.jpg",
  keywords: [
    "Jovia",
    "Jovia website",
    "Jovia official website",
    "what is Jovia",
    "join Jovia",
    "Jovia platform",
    "Jovia app",
    "Jovia sign up",
    "Jovia login",
    "Jovia membership",
    "Jovia rewards",
    "Jovia Friday Bonus Rewards",
    "Jovia FBR",
  ],
  links: {
    signUp: "/signup",
    login: "/login",
    dashboard: "/dashboard",
    howToRegister: "/how-to-register",
    platform: "/jovia-platform",
    app: "/jovia-app",
    home: "/",
  },
  // TODO: confirm this inbox is actually monitored before publishing it
  // anywhere on-page (it isn't linked from any page yet).
  contact: {
    email: "support@joviawebsite.com.ng",
  },
  // No real social profiles exist yet — intentionally left empty rather
  // than fabricated. Fill in once Jovia's accounts exist, and only then
  // wire them into Organization JSON-LD `sameAs` and the footer links.
  social: {},
} as const;

export type SiteConfig = typeof siteConfig;
