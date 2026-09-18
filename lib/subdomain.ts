import { headers } from "next/headers";
import { siteConfig } from "@/lib/site-config";

// The bare production hostname, e.g. "joviawebsite.com.ng".
export const ROOT_DOMAIN = new URL(siteConfig.url).hostname;

export type Section = "main" | "admin" | "dashboard";

const SUBDOMAIN_SECTIONS: Record<string, Exclude<Section, "main">> = {
  admin: "admin",
  dashboard: "dashboard",
};

// Which section a given Host header belongs to. Returns null for anything
// outside the production domain family (localhost, *.vercel.app previews,
// etc.) so callers can fall back to today's host-agnostic behavior there.
export function sectionForHostname(hostname: string): Section | null {
  const bareHost = hostname.split(":")[0];
  if (bareHost === ROOT_DOMAIN || bareHost === `www.${ROOT_DOMAIN}`) return "main";

  const subdomain = bareHost.endsWith(`.${ROOT_DOMAIN}`)
    ? bareHost.slice(0, -(ROOT_DOMAIN.length + 1))
    : null;
  if (subdomain && subdomain in SUBDOMAIN_SECTIONS) {
    return SUBDOMAIN_SECTIONS[subdomain];
  }

  return null;
}

export function isProductionDomainFamily(hostname: string): boolean {
  return sectionForHostname(hostname) !== null;
}

export function sectionHost(section: Exclude<Section, "main">): string {
  return `${section}.${ROOT_DOMAIN}`;
}

// Absolute, hostname-aware redirect target for use inside Server
// Actions/Components. On localhost or a *.vercel.app preview (no real
// subdomain DNS) this degrades to the plain relative path so local/dev
// testing keeps working exactly as before.
export async function sectionUrl(section: Section, path: string): Promise<string> {
  const headerList = await headers();
  const host = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(
    ":",
  )[0];
  const protocol = headerList.get("x-forwarded-proto") ?? "https";

  if (!isProductionDomainFamily(host)) return path;

  const targetHost = section === "main" ? ROOT_DOMAIN : sectionHost(section);
  return `${protocol}://${targetHost}${path}`;
}
