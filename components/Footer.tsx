import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/site-config";

const jovieLinks = [
  { href: "/", label: "Landing page" },
  { href: "/jovia-platform", label: "Jovia platform" },
  { href: "/jovia-app", label: "Jovia app" },
  { href: "/how-to-register", label: "How to register" },
  { href: "/signup", label: "Sign up" },
];

const supportLinks = [
  { href: "/#faq", label: "FAQ" },
  { href: "/login", label: "Member login" },
];

const socials = [
  { label: "Instagram", Icon: FaInstagram },
  { label: "X", Icon: FaXTwitter },
  { label: "Facebook", Icon: FaFacebookF },
];

export function Footer() {
  return (
    <footer className="border-t border-border-soft px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-soft">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <span
                key={s.label}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted"
              >
                <s.Icon size={14} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Jovia</p>
          <ul className="mt-4 space-y-3">
            {jovieLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-soft transition hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Support</p>
          <ul className="mt-4 space-y-3">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-soft transition hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border-soft pt-6 text-xs text-muted-soft sm:flex-row">
        <p>© {new Date().getFullYear()} Jovia Network. All rights reserved.</p>
        <p>Every second creates value.</p>
      </div>
    </footer>
  );
}
