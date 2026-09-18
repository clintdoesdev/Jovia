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

  const members = await prisma.user.findMany({
    where: { isAdmin: false },
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "Name",
    "Username",
    "Email",
    "Phone",
    "Country",
    "Package",
    "Status",
    "Activation date",
    "Joined",
  ];
  const rows = members.map((m) => [
    m.name,
    m.username ?? "",
    m.email,
    m.phone ?? "",
    m.country ?? "",
    m.activePackage ?? "",
    m.status,
    m.activationDate ? m.activationDate.toISOString().slice(0, 10) : "",
    m.createdAt.toISOString().slice(0, 10),
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="jovia-members-${Date.now()}.csv"`,
    },
  });
}
