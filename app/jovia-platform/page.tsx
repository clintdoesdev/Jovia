import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { platformFeatures } from "@/lib/content/features";
import { registrationSteps } from "@/lib/content/registration-steps";
import { platformFaqs } from "@/lib/content/platform-faq";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const title = "The Jovia Platform: One Account, Ever More Ways to Earn";
const description =
  "The Jovia platform brings account creation, active-session rewards, and four membership reward tiers together in one place.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/jovia-platform" },
  openGraph: { title, description, url: "/jovia-platform" },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: `${siteConfig.url}/jovia-platform`,
  isPartOf: { "@id": `${siteConfig.url}/#website` },
};

export default function JoviaPlatformPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="Jovia Platform"
          badge="THE JOVIA PLATFORM"
          title={title}
          description={description}
        />

        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">What is the Jovia platform?</h2>
            <p className="mt-4 text-muted">
              The Jovia platform is the single account behind Jovia Network.
              Instead of separate tools for signing up, running a session,
              and tracking rewards, the Jovia platform brings all of it into
              one member dashboard.
            </p>
            <p className="mt-4 text-muted">
              Every feature on the platform is built around one idea: staying
              active should be rewarded, and that reward should always be
              easy to see and track.
            </p>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="PLATFORM FEATURES"
              title="Everything included on the Jovia platform"
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {platformFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-surface p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                    <feature.icon size={20} strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground">How the Jovia platform works</h2>
            <div className="mt-8 space-y-4">
              {registrationSteps.map((step) => (
                <div
                  key={step.n}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-sm font-extrabold text-gold-400">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/signup" variant="cta">
                Join the Jovia platform
              </ButtonLink>
              <a href="/jovia-app" className="text-sm font-semibold text-gold-400 hover:underline">
                Looking to use Jovia on your phone? See the Jovia app.
              </a>
            </div>
          </div>
        </section>

        <section id="platform-faq" className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Jovia platform FAQ
            </h2>
            <div className="mt-10 divide-y divide-border-soft rounded-2xl border border-border bg-surface">
              {platformFaqs.map((item) => (
                <div key={item.q} className="p-6">
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd id="jovia-platform-webpage-jsonld" data={webPageJsonLd} />
      <JsonLd
        id="jovia-platform-faq-jsonld"
        data={faqJsonLd(platformFaqs.map((f) => ({ q: f.q, a: f.a })))}
      />
      <JsonLd
        id="jovia-platform-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Jovia Platform", path: "/jovia-platform" },
        ])}
      />
    </>
  );
}
