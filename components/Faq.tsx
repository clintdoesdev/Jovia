const faqs = [
  {
    q: "What is Jovia Network?",
    a: "Jovia is a membership platform. This is placeholder copy — replace it with Jovia's real value proposition when it's ready.",
  },
  {
    q: "How do I join?",
    a: "Create a free account, then upgrade to a membership tier whenever you're ready.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Membership tiers are month-to-month with no long-term commitment.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>

        <dl className="mt-12 divide-y divide-border-soft">
          {faqs.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="text-lg font-semibold text-foreground">{item.q}</dt>
              <dd className="mt-2 text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
