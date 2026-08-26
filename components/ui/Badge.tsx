export function Badge({
  children,
  dot = false,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-400">
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />}
      {children}
    </span>
  );
}
