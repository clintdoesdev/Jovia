const items = [
  "THE OFFICIAL JOVIA WEBSITE",
  "WATCH & EARN",
  "PLAY & EARN",
  "TIERED REWARDS",
  "FRIDAY BONUS REWARDS",
  "MEMBER COMMUNITY",
  "FLEXIBLE PAYOUTS",
  "24/7 ACCESS",
];

export function Marquee() {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-border-soft bg-ink-raised py-4">
      <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 px-4 text-xs font-semibold tracking-[0.2em] text-muted-soft"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
