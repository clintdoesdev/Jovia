import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#tiers", label: "Membership" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-soft bg-ink/85 backdrop-blur-md">
      <nav className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo />
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-sm font-medium text-muted md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ButtonLink href="/login" variant="ghost" className="hidden sm:inline-flex">
            Log in
          </ButtonLink>
          <ButtonLink href="/signup" variant="cta">
            Join Jovia
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
