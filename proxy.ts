import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookie, verifySessionToken } from "@/lib/auth";
import { sectionForHostname, sectionHost } from "@/lib/subdomain";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const AUTH_ONLY_PREFIXES = ["/login"];

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
