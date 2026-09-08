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
    a: "Yes. This is the official Jovia website — home to Jovia Network's membership packages, Friday Bonus Rewards, sign-up, and everything else Jovia provides.",
  },
  {
    q: "What are Jovia Silver and Jovia Gold?",
    a: "Jovia Silver (₦9,000) and Jovia Gold (₦15,000) are the two Jovia membership packages. Gold earns double the Silver rate on every activity — videos, games, sales, and more — plus exclusive access to Friday Bonus Rewards and Jovia AI.",
  },
  {
    q: "How do I earn on Jovia?",
    a: "Activate a Jovia Silver (₦9,000) or Jovia Gold (₦15,000) package, then set a countdown timer for an activity — watching videos or playing games — and earn every second while it runs. Gold members earn ₦100 per second; Silver members earn ₦50 per second.",
  },
  {
    q: "What is Friday Bonus Rewards (FBR)?",
    a: "Friday Bonus Rewards is a weekly bonus exclusive to Jovia Gold members. A random number appears on your screen every Friday — tap it fast to claim a $10 reward and withdraw instantly. Winners are featured on official Jovia celebration flyers, and monthly validity applies.",
  },
  {
    q: "How do I join?",
    a: "Create your account, then activate a Jovia Silver or Jovia Gold package whenever you're ready to begin earning.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Account creation is free, and there's no long-term commitment on either package.",
  },
  {
    q: "How are reward tiers calculated?",
    a: "Inside the system, $1 = ₦1,000. Jovia Silver earns ₦50 per second (₦1,000 every 20 seconds); Jovia Gold earns ₦100 per second (₦2,000 every 20 seconds). Game sessions are rewarded based on gameplay time, win or lose.",
  },
] as const;
