import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { registrationSteps as steps } from "@/lib/content/registration-steps";

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
            Creating a Jovia account takes less than two minutes — here&apos;s
            exactly what happens when you join.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <ButtonLink href="/signup" variant="ghost">
              Join us now
            </ButtonLink>
            <a
              href="/how-to-register"
              className="text-sm font-semibold text-gold-400 hover:underline"
            >
              Read the full registration guide
            </a>
          </div>
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
