import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const payments = await prisma.payment.findMany({ orderBy: { createdAt: "desc" } });

  const header = [
    "Reference",
    "Customer name",
    "Customer email",
    "Package",
    "Amount (NGN)",
    "Status",
    "Payment method",
    "Date",
  ];
  const rows = payments.map((p) => [
    p.reference,
    p.customerName ?? "",
    p.customerEmail ?? "",
    p.packageId,
    String(p.amount),
    p.status,
    p.paymentMethod ?? "",
    p.createdAt.toISOString(),
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="jovia-payments-${Date.now()}.csv"`,
    },
  });
}
