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
    title: "Start a session",
    body: "Activate a session whenever you're ready to start earning toward a reward tier.",
  },
  {
    n: "03",
    title: "Reach a tier",
    body: "The longer an active session runs, the higher the reward tier you reach.",
  },
  {
    n: "04",
    title: "Collect your value",
    body: "Track everything and manage your account from your member dashboard.",
  },
] as const;
