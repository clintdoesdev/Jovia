"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { membershipPackages } from "@/lib/config/tiers";
import { initializeKorapayCharge } from "@/lib/korapay";
import { siteConfig } from "@/lib/site-config";

export type PaymentActionState = { error?: string };

export async function initializePaymentAction(
  _prevState: PaymentActionState,
  formData: FormData,
): Promise<PaymentActionState> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?next=/payment");
  }

  const pkg = membershipPackages.find((p) => p.id === formData.get("packageId"));
  if (!pkg) {
    return { error: "Choose a valid package." };
  }

  const reference = `JOVIA-${randomUUID()}`;

  await prisma.payment.create({
    data: {
      userId: user.id,
      packageId: pkg.id,
      amount: pkg.amountNaira,
      currency: "NGN",
      reference,
      status: "pending",
    },
  });

  const result = await initializeKorapayCharge({
    amount: pkg.amountNaira,
    currency: "NGN",
    reference,
    customerName: user.name,
    customerEmail: user.email,
    narration: `${pkg.name} package activation`,
    redirectUrl: `${siteConfig.url}/payment/callback?reference=${reference}`,
    notificationUrl: `${siteConfig.url}/api/payments/webhook`,
  });

  if (!result.ok) {
    return { error: result.message };
  }

  redirect(result.checkoutUrl);
}
