// @ts-check
import { PrismaClient } from '@prisma/client'
import { Client } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'

const connectionString = process.env.DATABASE_URL_PLANETSCALE

const adapter = new PrismaPlanetScale({ url: connectionString })
const prisma = new PrismaClient({ adapter })

export async function handler() {
  await prisma.$executeRaw`SELECT 1`
}
