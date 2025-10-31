import { PrismaClient } from '../generated/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

export async function getUsers() {
  // Do a query and disconnect
  // So we also test that connection is re-established in next query below
  await prisma.user.findFirst()
  await prisma.$disconnect()

  // query should re-connect automatically
  return await prisma.$transaction([prisma.user.findFirst(), prisma.user.findMany()])
}
