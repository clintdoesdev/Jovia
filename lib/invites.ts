import "server-only";
import { randomBytes } from "node:crypto";

export function generateInviteCode() {
  return randomBytes(6).toString("base64url");
}

export type InviteValidity =
  | { ok: true }
  | { ok: false; reason: "not_found" | "used" | "revoked" | "expired" };

export function checkInviteValidity(invite: {
  status: string;
  expiresAt: Date | null;
} | null): InviteValidity {
  if (!invite) return { ok: false, reason: "not_found" };
  if (invite.status === "used") return { ok: false, reason: "used" };
  if (invite.status === "revoked") return { ok: false, reason: "revoked" };
  if (invite.expiresAt && invite.expiresAt.getTime() < Date.now()) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true };
}
