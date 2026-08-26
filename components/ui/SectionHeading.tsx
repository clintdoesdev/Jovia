import { Badge } from "@/components/ui/Badge";

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
}: {
  badge: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <Badge>{badge}</Badge>
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="text-base text-muted">{description}</p>}
    </div>
  );
}
