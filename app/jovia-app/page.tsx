import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { installSteps } from "@/lib/content/install-steps";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "The Jovia App — Install on Any Device";
const description =
  "Jovia is an installable web app — add it to your home screen on iPhone, Android, or desktop for one-tap access to your dashboard.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/jovia-app" },
  openGraph: { title, description, url: "/jovia-app" },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Jovia",
  url: `${siteConfig.url}/jovia-app`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "The Jovia web app, installable to your home screen from any modern browser.",
};

export default function JoviaAppPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Jovia App"
          badge="THE JOVIA APP"
          title={title}
          description={description}
        />

        <section className="px-6 py-20">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-muted">
              Jovia isn&apos;t in the App Store or Google Play — it&apos;s a
              web app you install straight from your browser. That means one
              codebase, instant updates, and no app-store review to wait on.
              Pick your device below.
            </p>
          </Reveal>
        </section>

        <section className="px-6 py-16">
          <StaggerGroup className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {installSteps.map((group) => (
              <StaggerItem
                key={group.platform}
                className="rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40"
              >
                <h2 className="text-sm font-semibold text-foreground">{group.platform}</h2>
                <ol className="mt-4 space-y-3">
                  {group.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-xs font-bold text-gold-400">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center gap-4">
              <ButtonLink href="/signup" variant="cta">
                Join us now
              </ButtonLink>
              <a href="/jovia-platform" className="text-sm font-semibold text-gold-400 hover:underline">
                See what the Jovia platform includes
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <JsonLd id="jovia-app-jsonld" data={webAppJsonLd} />
      <JsonLd
        id="jovia-app-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Jovia App", path: "/jovia-app" },
        ])}
      />
    </>
  );
}
