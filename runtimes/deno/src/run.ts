import { PrismaClient } from "../generated/client.ts";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const users = await prisma.user.findFirst();
console.log(users);
