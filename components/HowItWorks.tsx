import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
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
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Badge>GETTING STARTED</Badge>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            How to join Jovia
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Creating a Jovia account takes less than a minute — here&apos;s
            exactly what happens when you join.
          </p>
          <ButtonLink href="/signup" variant="ghost" className="mt-7">
            Join us now
          </ButtonLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.n} className="rounded-2xl border border-border bg-surface p-6">
              <span className="text-2xl font-extrabold text-gold-400">{step.n}</span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
