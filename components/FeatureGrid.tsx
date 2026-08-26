import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: "📊",
    title: "Active session rewards",
    body: "Every completed session earns toward your tier — tracked automatically from your dashboard.",
  },
  {
    icon: "📱",
    title: "Member perks",
    body: "Unlock community perks and milestones as your account grows with the network.",
  },
  {
    icon: "🛡️",
    title: "Account protection",
    body: "Your membership, activity, and rewards are secured behind signed sessions and encrypted credentials.",
  },
  {
    icon: "🏆",
    title: "Tiered payouts",
    body: "Four reward tiers scale with how long you stay active in a session — see Membership tiers below.",
  },
  {
    icon: "🎓",
    title: "Jovia resources",
    body: "Guides and resources to help new members get the most out of their membership from day one.",
  },
  {
    icon: "👥",
    title: "Community",
    body: "Join a growing circle of Jovia members sharing wins, strategies, and momentum.",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          badge="THE JOVIA ECOSYSTEM"
          title="One membership. Ever more ways to earn."
          description="Jovia combines active-session rewards, member perks, and community into one ecosystem — everything you need in one account."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-7 transition hover:border-violet-500/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-lg">
                {feature.icon}
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
