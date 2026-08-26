const steps = [
  {
    title: "Create your account",
    body: "Sign up in under a minute and set up your Jovia membership profile.",
  },
  {
    title: "Stay active",
    body: "Engage with the network — every session you complete builds toward your rewards.",
  },
  {
    title: "Collect your value",
    body: "Cash out or redeem what you've earned once you hit a tier threshold.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            How Jovia works
          </h2>
          <p className="mt-4 text-muted">
            A simple loop: join, participate, get rewarded. Placeholder
            steps — refine once the real product flow is defined.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-surface/60 p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-button)] text-sm font-bold text-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
