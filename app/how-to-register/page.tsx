import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { registrationSteps } from "@/lib/content/registration-steps";

const title = "How to Register on Jovia (Step-by-Step Guide)";
const description =
  "A step-by-step guide to creating your Jovia account, starting a session, and reaching your first reward tier.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/how-to-register" },
  openGraph: { title, description, url: "/how-to-register" },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Register on Jovia",
  description: "A step-by-step guide to creating your Jovia account.",
  totalTime: "PT2M",
  step: registrationSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.body,
    url: `${siteConfig.url}/how-to-register#step-${index + 1}`,
  })),
};

export default function HowToRegisterPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader
          crumb="How to Register"
          badge="GETTING STARTED"
          title="How to register on Jovia"
          description="Creating a Jovia account takes less than two minutes — here's exactly what happens at each step."
        />

        <div className="mx-auto max-w-4xl px-6 py-16">
          <StaggerGroup as="ol" className="space-y-5">
            {registrationSteps.map((step, index) => (
              <StaggerItem
                key={step.n}
                as="li"
                id={`step-${index + 1}`}
                className="flex gap-5 rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/40"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10 text-lg font-extrabold text-gold-400">
                  {step.n}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-foreground">{step.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/signup" variant="cta">
                Join us now
              </ButtonLink>
              <a href="/jovia-platform" className="text-sm font-semibold text-gold-400 hover:underline">
                See what the Jovia platform includes
              </a>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <JsonLd id="how-to-register-jsonld" data={howToJsonLd} />
      <JsonLd
        id="how-to-register-breadcrumb-jsonld"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How to Register", path: "/how-to-register" },
        ])}
      />
    </>
  );
}
