-- AlterTable: users
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "username" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "country" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'registered';
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "isAdmin" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "activationDate" TIMESTAMP(3);
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "loginNote" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "adminNote" TEXT;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "inviteId" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "users_inviteId_key" ON "users"("inviteId");

-- CreateTable: invites
CREATE TABLE IF NOT EXISTS "invites" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "note" TEXT,
    "packageId" TEXT,
    "expiresAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "invites_code_key" ON "invites"("code");

-- AlterTable: payments — userId becomes optional (invite checkouts happen
-- before an account exists), and we snapshot the payer's name/email plus
-- link back to the invite that produced the charge.
ALTER TABLE "payments" ALTER COLUMN "userId" DROP NOT NULL;
ALTER TABLE "payments" ADD COLUMN IF NOT EXISTS "inviteId" TEXT;
ALTER TABLE "payments" ADD COLUMN IF NOT EXISTS "customerName" TEXT;
ALTER TABLE "payments" ADD COLUMN IF NOT EXISTS "customerEmail" TEXT;

CREATE INDEX IF NOT EXISTS "payments_inviteId_idx" ON "payments"("inviteId");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "users" ADD CONSTRAINT "users_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "invites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "payments" ADD CONSTRAINT "payments_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "invites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
