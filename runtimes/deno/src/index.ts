import { type PrismaClient } from '../generated/client/index.d.ts'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const Prisma = require('../generated/client/index.js')

// const prisma = new PrismaClient();
export const prisma: PrismaClient = new Prisma.PrismaClient()

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

const users = await prisma.user.findFirst();
console.log(users)