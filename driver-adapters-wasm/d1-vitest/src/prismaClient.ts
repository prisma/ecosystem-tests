import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

export function getPrisma(DB: D1Database) {
  const adapter = new PrismaD1(DB)
  return new PrismaClient({ adapter })
}
