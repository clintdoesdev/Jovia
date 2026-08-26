import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookie, verifySessionToken } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ONLY_PREFIXES = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  // `nextUrl.hostname` can lag behind the real Host header in this setup,
  // so always resolve the host (and scheme) explicitly.
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");

  const { pathname } = request.nextUrl;
  const token = request.cookies.get(sessionCookie.name)?.value;
  const session = token ? await verifySessionToken(token) : null;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

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
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
