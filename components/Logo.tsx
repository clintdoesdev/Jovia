import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Jovia Network home"
    >
      <Image
        src="/brand/jovia-mark.png"
        alt=""
        width={36}
        height={36}
        priority
        className="h-9 w-9"
      />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Jovia
        </span>
        <span className="text-[10px] font-medium tracking-[0.3em] text-muted-soft">
          NETWORK
        </span>
      </span>
    </Link>
  );
}
