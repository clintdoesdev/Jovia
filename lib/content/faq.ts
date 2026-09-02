// Single source of truth for the homepage FAQ — rendered both as the
// visible accordion (components/Faq.tsx) and as FAQPage JSON-LD
// (app/page.tsx). Google requires these to match exactly, so don't let
// them diverge into two separate copies.
export const homeFaqs = [
  {
    q: "What is Jovia Network?",
    a: "Jovia is a multinational intelligent networking platform that helps users earn for the time they spend through networking, digital skills, entertainment, and engaging activities. Jovia stands for Just One Vision: Intelligent Advancement.",
  },
  {
    q: "Is this the official Jovia website?",
    a: "Yes. This is the official Jovia website — home to Jovia Network's membership, reward tiers, Friday Bonus Rewards, sign-up, and everything else Jovia provides.",
  },
  {
    q: "How do I earn on Jovia?",
    a: "Set a countdown timer for an activity — watching videos or playing games — and earn money every second while it runs. Watch and earn up to $12 daily; play games and earn up to $20 daily.",
  },
  {
    q: "What is Friday Bonus Rewards (FBR)?",
    a: "Friday Bonus Rewards is a weekly bonus for members. A random number appears on your screen every Friday — tap it fast to claim a $10 reward and withdraw instantly. Winners are featured on official Jovia celebration flyers, and monthly validity applies.",
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
    a: "For video sessions, 1 second is worth $0.01 — so 20 seconds earns $2 and 2 minutes earns $12. Game sessions are rewarded based on gameplay time, win or lose.",
  },
] as const;
