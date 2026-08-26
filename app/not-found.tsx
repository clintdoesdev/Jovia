import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <h1 className="text-4xl font-extrabold text-foreground">Page not found</h1>
      <p className="max-w-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <ButtonLink href="/" variant="cta">
        Back to home
      </ButtonLink>
    </div>
  );
}
