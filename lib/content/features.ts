import { BarChart3, Smartphone, Shield, Trophy, GraduationCap, Users } from "lucide-react";

// Shared between the homepage feature grid and /jovia-platform.
export const platformFeatures = [
  {
    icon: BarChart3,
    title: "Active session rewards",
    body: "Every completed session earns toward your tier — tracked automatically from your dashboard.",
  },
  {
    icon: Smartphone,
    title: "Member perks",
    body: "Unlock community perks and milestones as your account grows with the network.",
  },
  {
    icon: Shield,
    title: "Account protection",
    body: "Your membership, activity, and rewards are secured behind signed sessions and encrypted credentials.",
  },
  {
    icon: Trophy,
    title: "Tiered payouts",
    body: "Four reward tiers scale with how long you stay active in a session — see Membership tiers below.",
  },
  {
    icon: GraduationCap,
    title: "Jovia resources",
    body: "Guides and resources to help new members get the most out of their membership from day one.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Join a growing circle of Jovia members sharing wins, strategies, and momentum.",
  },
] as const;
