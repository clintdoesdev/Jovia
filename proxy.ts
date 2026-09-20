import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookie, verifySessionToken } from "@/lib/auth";
import { sectionForHostname, sectionHost } from "@/lib/subdomain";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const AUTH_ONLY_PREFIXES = ["/login"];

// Temporary: the member dashboard and admin panel are fully shut down —
// including for admins — while /payments runs as a direct, no-login entry
// point. To bring either back, remove it from this set; everything below
// (canonicalization, auth gating) is untouched and resumes working as soon
// as a section is no longer listed here.
const SHUT_DOWN_SECTIONS = new Set(["admin", "dashboard"]);

function unavailableResponse() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Temporarily Unavailable — Jovia</title>
  </head>
  <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#05040a;color:#f5f5f7;font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:24px;">
    <div>
      <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">Temporarily unavailable</h1>
      <p style="color:#a1a1aa;">This section is offline for now. Please check back shortly.</p>
    </div>
  </body>
</html>`;
  return new NextResponse(html, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
      "Retry-After": "3600",
    },
  });
}

export async function proxy(request: NextRequest) {
  // `nextUrl.hostname` can lag behind the real Host header in this setup,
  // so always resolve the host (and scheme) explicitly.
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");

  const { pathname } = request.nextUrl;

  // Subdomain canonicalization. Next.js routes by pathname only — without
  // this, admin.<domain> and dashboard.<domain> just serve whatever page
  // matches "/" (the marketing homepage), which is the "wrong page" bug.
  // This is null on localhost/*.vercel.app previews, so none of it fires
  // outside the real production domain family.
  const section = sectionForHostname(host);

  if (
    SHUT_DOWN_SECTIONS.has(section ?? "") ||
    (section === "main" &&
      (pathname === "/admin" ||
        pathname.startsWith("/admin/") ||
        pathname === "/dashboard" ||
        pathname.startsWith("/dashboard/")))
  ) {
    return unavailableResponse();
  }

  if (section === "admin" && pathname === "/") {
    return NextResponse.redirect(new URL("/admin", `${protocol}://${host}`));
  }
  if (section === "dashboard" && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", `${protocol}://${host}`));
  }
  if (section === "main" && (pathname === "/admin" || pathname.startsWith("/admin/"))) {
    return NextResponse.redirect(new URL(pathname, `${protocol}://${sectionHost("admin")}`));
  }
  if (
    section === "main" &&
    (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
  ) {
    return NextResponse.redirect(new URL(pathname, `${protocol}://${sectionHost("dashboard")}`));
  }

  const token = request.cookies.get(sessionCookie.name)?.value;
  const session = token ? await verifySessionToken(token) : null;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((prefix) => pathname === prefix);

  if (isProtected && !session) {
    // Redirects are browser-side, so it's safe to build the URL from the
    // real host directly.
    const redirectUrl = new URL(
      `/login?next=${encodeURIComponent(pathname)}`,
      `${protocol}://${host}`,
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthOnly && session) {
    if (section) {
      // In the real domain family, send logged-in visitors straight to the
      // canonical dashboard subdomain instead of bouncing them through the
      // main-domain "/dashboard" canonicalization redirect above.
      return NextResponse.redirect(
        new URL("/dashboard", `${protocol}://${sectionHost("dashboard")}`),
      );
    }
    // Rewrites perform a real server-side fetch and need a self-resolvable
    // target, so clone the current request URL instead of constructing a
    // new one from the host header.
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*", "/login"],
};
