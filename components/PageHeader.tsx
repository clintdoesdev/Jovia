import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function PageHeader({
  crumb,
  badge,
  title,
  description,
}: {
  crumb: string;
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border-soft px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-banner)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm text-muted-soft">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / {crumb}
        </p>
        <div className="mt-5">
          <Badge>{badge}</Badge>
        </div>
        <h1 className="mt-5 max-w-xl text-3xl font-extrabold text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-muted">{description}</p>
      </div>
    </div>
  );
}
