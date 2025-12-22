// @ts-check
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export async function handler() {
  await prisma.$executeRaw`SELECT 1`
}
