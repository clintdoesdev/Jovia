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
        <div className="relative">
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
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
