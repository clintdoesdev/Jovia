import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  await prisma.user.upsert({
    where: { email: "demo@joviawebsite.com.ng" },
    update: {},
    create: {
      name: "Jovia Demo",
      email: "demo@joviawebsite.com.ng",
      passwordHash,
    },
  });

  console.log("Seeded demo user: demo@joviawebsite.com.ng / password123");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const adminPasswordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { isAdmin: true, passwordHash: adminPasswordHash },
      create: {
        name: "Jovia Admin",
        email: adminEmail,
        passwordHash: adminPasswordHash,
        isAdmin: true,
        status: "active",
      },
    });
    console.log(`Seeded admin user: ${adminEmail}`);
  } else {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipped admin seed.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
