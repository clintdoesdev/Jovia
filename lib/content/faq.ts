// Single source of truth for the homepage FAQ — rendered both as the
// visible accordion (components/Faq.tsx) and as FAQPage JSON-LD
// (app/page.tsx). Google requires these to match exactly, so don't let
// them diverge into two separate copies.
export const homeFaqs = [
  {
    q: "What is Jovia Network?",
    a: "Jovia is a membership platform. This is placeholder copy — replace it with Jovia's real value proposition when it's ready.",
  },
  {
    q: "Is this the official Jovia website?",
    a: "Yes. This is the official Jovia website — home to Jovia Network's membership, reward tiers, sign-up, and everything else Jovia provides.",
  },
  {
    q: "How do I join?",
    a: "Create a free account, then start a session whenever you're ready to begin earning toward a reward tier.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Membership is free to join with no long-term commitment.",
  },
  {
    q: "How are reward tiers calculated?",
    a: "Placeholder mechanic — the amounts and durations shown across the site mirror the brand reference and will be replaced with the real reward logic.",
  },
] as const;
