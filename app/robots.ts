import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/site-config";
import { sectionForHostname } from "@/lib/subdomain";

// Crawlers treat admin.<domain>/robots.txt and dashboard.<domain>/robots.txt
// as entirely separate files from the main domain's — a disallow list
// scoped to /admin and /dashboard paths does nothing to stop those
// subdomains themselves from being crawled and indexed. Reading the
// request host makes this route dynamic, but it's the only way to give
// each subdomain its own (fully-blocking) robots.txt.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headerList = await headers();
  const host = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(
    ":",
  )[0];
  const section = sectionForHostname(host);

  if (section === "admin" || section === "dashboard") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/payment", "/signup/success", "/admin", "/invite", "/api"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
