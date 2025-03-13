import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

db.$connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err: unknown) => console.error("❌ Database connection error:", err));
