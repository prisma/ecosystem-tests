import { PrismaClient } from "../generated/client.ts";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export async function getUsers() {
  // Do a query and disconnect
  // So we also test that connection is re-established in next query below
  await prisma.user.findFirst();
  await prisma.$disconnect();

  // query should re-connect automatically
  return await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany(),
  ]);
}
