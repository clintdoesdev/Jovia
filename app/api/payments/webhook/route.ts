import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyKorapayWebhookSignature } from "@/lib/korapay";

type KorapayWebhookData = {
  reference?: string;
  status?: string;
  payment_method?: string;
};

export async function POST(request: Request) {
  const rawBody = await request.text();

  let payload: { event?: string; data?: KorapayWebhookData };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const signature = request.headers.get("x-korapay-signature");
  if (!payload.data || !verifyKorapayWebhookSignature(payload.data, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const { reference, status: korapayStatus, payment_method: paymentMethod } = payload.data;
  if (!reference) {
    return NextResponse.json({ error: "missing reference" }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({ where: { reference } });
  if (!payment) {
    // Not one of ours (or a test event) — acknowledge so KoraPay stops retrying.
    return NextResponse.json({ received: true });
  }

  const status = korapayStatus === "success" ? "success" : "failed";

  await prisma.payment.update({
    where: { reference },
    data: { status, paymentMethod: paymentMethod ?? payment.paymentMethod },
  });

  if (status === "success") {
    await prisma.user.update({
      where: { id: payment.userId },
      data: { activePackage: payment.packageId },
    });
  }

  return NextResponse.json({ received: true });
}
