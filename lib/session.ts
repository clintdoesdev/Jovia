import "server-only";
import { cookies, headers } from "next/headers";
import { createSessionToken, sessionCookie, verifySessionToken, type SessionPayload } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ROOT_DOMAIN, isProductionDomainFamily } from "@/lib/subdomain";

// A cookie set with no `domain` is host-only and invisible to sibling
// subdomains, so admin./dashboard. would never see a session set on the
// main domain (and vice versa). Only widen it to the shared root domain
// when the current request is genuinely on that domain family — a
// hardcoded domain would make the browser silently reject the cookie on
// localhost or a *.vercel.app preview.
async function cookieDomain() {
  const headerList = await headers();
  const host = (headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "").split(
    ":",
  )[0];
  return isProductionDomainFamily(host) ? `.${ROOT_DOMAIN}` : undefined;
}

export async function setSession(payload: SessionPayload) {
  const token = await createSessionToken(payload);
  const store = await cookies();
  const domain = await cookieDomain();
  store.set(sessionCookie.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionCookie.maxAge,
    ...(domain ? { domain } : {}),
  });
}

export async function clearSession() {
  const store = await cookies();
  const domain = await cookieDomain();
  store.set(sessionCookie.name, "", {
    path: "/",
    maxAge: 0,
    ...(domain ? { domain } : {}),
  });
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(sessionCookie.name)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      phone: true,
      country: true,
      activePackage: true,
      status: true,
      isAdmin: true,
      activationDate: true,
      loginNote: true,
      createdAt: true,
    },
  });
}
