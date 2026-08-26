// Deliberately a plain <script> tag, not next/script's <Script> component:
// next/script is optimized for loading executable JS and can defer
// injection until after hydration, which would hide this from crawlers.
// JSON-LD needs to be present in the initial server-rendered HTML.
export function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
