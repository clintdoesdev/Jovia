// Shared between the homepage teaser (components/HowItWorks.tsx) and the
// full guide at /how-to-register (including its HowTo JSON-LD), so the
// two never drift out of sync.
export const registrationSteps = [
  {
    n: "01",
    title: "Create your account",
    body: "Sign up with your name, email, and a secure password in under a minute.",
  },
  {
    n: "02",
    title: "Activate a package",
    body: "Choose Jovia Silver (₦9,000) or Jovia Gold (₦15,000) to unlock your earning rate.",
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
