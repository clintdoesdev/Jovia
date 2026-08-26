import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border-soft/60 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Logo />
        <p className="text-sm text-muted-soft">
          © {new Date().getFullYear()} Jovia Network. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
