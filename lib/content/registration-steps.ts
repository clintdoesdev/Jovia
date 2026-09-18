// Shared between the homepage teaser (components/HowItWorks.tsx) and the
// full guide at /how-to-register (including its HowTo JSON-LD), so the
// two never drift out of sync.
export const registrationSteps = [
  {
    n: "01",
    title: "Get your invite",
    body: "Message us on Telegram and we'll send you a private invite link to join Jovia.",
  },
  {
    n: "02",
    title: "Activate a package",
    body: "Follow your invite link to pay for Jovia Silver (₦9,000) or Jovia Gold (₦15,000) — your account is created the moment payment clears.",
  },
  {
    n: "03",
    title: "Start a session",
    body: "Set a countdown timer and start earning every second it runs — Gold earns double the Silver rate.",
  },
  {
    n: "04",
    title: "Collect your value",
    body: "Track everything and manage your account from your member dashboard.",
  },
] as const;
