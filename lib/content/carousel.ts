export type CarouselCard = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

export const carouselCards: CarouselCard[] = [
  {
    id: "welcome",
    image: "/brand/carousel/welcome.jpg",
    alt: "Jovia member holding an oversized gold clock",
    eyebrow: "WELCOME TO JOVIA",
    title: "Just One Vision: Intelligent Advancement",
    description:
      "A multinational intelligent networking platform built on one mission: every user gains value from their time.",
    cta: "See what Jovia is",
    href: "/#who-we-are",
  },
  {
    id: "watch-earn",
    image: "/brand/carousel/watch-earn.jpg",
    alt: "Jovia member smiling while watching videos on her phone",
    eyebrow: "WATCH & EARN",
    title: "Earn up to $12 daily watching videos",
    description:
      "Content creator, music, AI, dance, and comedy videos — set a countdown and earn every second you watch.",
    cta: "See watch & earn",
    href: "/#watch-and-earn",
  },
  {
    id: "play-earn",
    image: "/brand/carousel/play-earn.jpg",
    alt: "Jovia member laughing while playing a game on a handheld console",
    eyebrow: "PLAY & EARN",
    title: "Earn up to $20 daily playing games",
    description:
      "Win or lose, the system allocates rewards based on gameplay time — every session pays.",
    cta: "See play & earn",
    href: "/#play-and-earn",
  },
  {
    id: "friday-bonus",
    image: "/brand/carousel/friday-bonus.jpg",
    alt: "Jovia member holding a phone showing a glowing Friday Bonus Rewards number",
    eyebrow: "FRIDAY BONUS REWARDS",
    title: "Win & withdraw $10 every Friday",
    description:
      "A random number appears every Friday — tap fast to claim your $10 reward and withdraw instantly.",
    cta: "See Friday Bonus Rewards",
    href: "/#friday-bonus-rewards",
  },
  {
    id: "why-choose-us",
    image: "/brand/carousel/why-choose-us.jpg",
    alt: "Jovia member holding a gold trophy shaped like the Jovia logo",
    eyebrow: "WHY CHOOSE US",
    title: "Users first, every time",
    description:
      "Expert team, transparency, data security, 24/7 support, and fast payments — built for worldwide recognition.",
    cta: "See why choose us",
    href: "/#why-choose-us",
  },
];
