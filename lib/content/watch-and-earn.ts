import { Clapperboard, Bot, Music2, Sparkles as SparklesIcon } from "lucide-react";

export const watchCategories = [
  { icon: Clapperboard, label: "Content creator videos" },
  { icon: Music2, label: "Music videos" },
  { icon: Bot, label: "AI videos" },
  { icon: SparklesIcon, label: "Dance & comedy videos" },
];

export const watchSteps = [
  {
    title: "Step one",
    body: "Set a countdown time — choose how long you want to watch for.",
  },
  {
    title: "Step two",
    body: "Press start to activate the countdown and watch as every second adds money to your account.",
  },
];

export const watchExamples = [
  { duration: "1 second", amount: "$0.01" },
  { duration: "20 seconds", amount: "$2" },
  { duration: "2 minutes", amount: "$12" },
] as const;
