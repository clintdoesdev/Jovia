import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// KoraPay Standard Checkout — https://developers.korapay.com/docs/checkout-standard
// Webhook signing — https://developers.korapay.com/docs/webhooks
const KORAPAY_BASE_URL = "https://api.korapay.com/merchant/api/v1";

export type InitializeChargeParams = {
  amount: number;
  currency: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  narration: string;
  redirectUrl: string;
  notificationUrl: string;
};

export type InitializeChargeResult =
  | { ok: true; checkoutUrl: string }
  | { ok: false; message: string };

export async function initializeKorapayCharge(
  params: InitializeChargeParams,
): Promise<InitializeChargeResult> {
  const secretKey = process.env.KORAPAY_SECRET_KEY;
  if (!secretKey) {
    return {
      ok: false,
      message: "Payments aren't configured yet — KORAPAY_SECRET_KEY is missing.",
    };
  }

  let response: Response;
  try {
    response = await fetch(`${KORAPAY_BASE_URL}/charges/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        reference: params.reference,
        customer: { name: params.customerName, email: params.customerEmail },
        narration: params.narration,
        redirect_url: params.redirectUrl,
        notification_url: params.notificationUrl,
      }),
    });
  } catch {
    return { ok: false, message: "Could not reach KoraPay. Please try again shortly." };
  }

  const body: { data?: { checkout_url?: string }; message?: string } | null = await response
    .json()
    .catch(() => null);

  const checkoutUrl = body?.data?.checkout_url;
  if (!response.ok || !checkoutUrl) {
    return { ok: false, message: body?.message ?? "KoraPay could not start this payment." };
  }

  return { ok: true, checkoutUrl };
}

/**
 * KoraPay signs webhook deliveries with `x-korapay-signature`: an HMAC-SHA256
 * of `JSON.stringify(payload.data)` (only the `data` object, not the full
 * body) keyed with your account secret key.
 */
export function verifyKorapayWebhookSignature(
  data: unknown,
  signatureHeader: string | null,
): boolean {
  const secretKey = process.env.KORAPAY_SECRET_KEY;
  if (!secretKey || !signatureHeader) return false;

  const expected = createHmac("sha256", secretKey).update(JSON.stringify(data)).digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");
  const providedBuf = Buffer.from(signatureHeader, "utf8");
  if (expectedBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(expectedBuf, providedBuf);
}
