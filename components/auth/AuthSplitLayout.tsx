import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/Badge";

export function AuthSplitLayout({
  badge,
  title,
  description,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex flex-col justify-between overflow-hidden px-8 py-10 lg:w-[38%] lg:px-12 lg:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-banner)]"
        />
        <div
          aria-hidden
          className="glow-orb pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl"
        />
        <div
          aria-hidden
          className="glow-orb pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="relative animate-fade-up">
          <Logo />
          <div className="mt-14">
            <Badge>{badge}</Badge>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-sm text-muted">{description}</p>
          </div>
        </div>
        <p className="relative mt-16 text-sm text-muted-soft lg:mt-0">
          Every second creates value.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-ink px-6 py-14">
        <div className="w-full max-w-sm animate-fade-up" style={{ animationDelay: "0.15s" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
