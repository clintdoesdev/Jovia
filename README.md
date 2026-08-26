# Jovia Network

Membership platform site for `joviawebsite.com.ng`. This is a structural
clone of the Evermore project's architecture, rebranded to Jovia with a
palette derived from the Jovia brand references (deep violet base, gold
CTA accent, magenta/violet glow, money-green highlights). The business
copy throughout is generic placeholder for a membership platform — swap
it out once Jovia's real value proposition is defined.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, React 19
- Tailwind CSS v4, CSS-first config via `@theme inline` in `app/globals.css`
- `motion` (`motion/react`) for animation
- PostgreSQL via Prisma ORM 7 + `@prisma/adapter-pg` (driver adapter, required in Prisma 7)
- `bcryptjs` (12 salt rounds) + `jose` for signed JWT session cookies
- `zod` for input validation
- `tsx` to run the seed script

## Local setup

```bash
cp .env.example .env   # set DATABASE_URL and SESSION_SECRET
npm install
npm run db:generate
npm run db:migrate     # applies prisma/migrations/*
npm run db:seed        # creates demo@joviawebsite.com.ng / password123
npm run dev
```

## Architecture notes / framework gotchas handled here

- **`proxy.ts`, not `middleware.ts`.** Next 16 renamed the file convention;
  the exported function is named `proxy`. It gates `/dashboard` (requires a
  valid session) and `/login` + `/signup` (redirects away if already
  signed in).
- **Host/protocol resolution in `proxy.ts`.** `request.nextUrl.hostname`
  isn't trustworthy behind this setup's proxying, so the host comes from
  `x-forwarded-host` (falling back to `host`) and the scheme from
  `x-forwarded-proto` (falling back to `nextUrl.protocol`) before building
  a redirect URL. The same-origin `/dashboard` rewrite instead uses
  `request.nextUrl.clone()`.
- **No empty-body error responses.** `app/api/health/route.ts` and
  `app/not-found.tsx` always return real body content on non-2xx/404
  responses.
- **Prisma 7 driver adapter.** `prisma/schema.prisma` has no `url` in its
  `datasource` block — that lives in `prisma.config.ts` via
  `defineConfig({ datasource: { url: ... } })`. The generator uses
  `provider = "prisma-client"` with an explicit `output` path
  (`lib/generated/prisma`), and `lib/prisma.ts` constructs `PrismaClient`
  with `@prisma/adapter-pg`.
- **Hand-authored migrations.** `prisma migrate dev` needs a TTY this
  environment doesn't have, so migrations are generated with
  `prisma migrate diff --script` and committed under
  `prisma/migrations/<timestamp>_<name>/migration.sql`, then applied with
  `prisma migrate deploy`. Statements use `IF NOT EXISTS` guards since
  Postgres doesn't wrap a migration file in one transaction by default.

## Structure

- `app/` — routes: `/` (landing), `/login`, `/signup`, `/dashboard`
  (protected), `/api/health`
- `components/` — landing sections, auth forms, shared UI
- `lib/actions/auth.ts` — server actions for signup/login/logout
- `lib/auth.ts` / `lib/session.ts` — password hashing + JWT session cookie
- `lib/config/tiers.ts` — placeholder membership-tier data
- `prisma/` — schema, hand-authored migrations, seed script
