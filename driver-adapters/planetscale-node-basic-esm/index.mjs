// @ts-check
import { PrismaClient } from '@prisma/client'
import { Client } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'

const connectionString = process.env.DRIVER_ADAPTERS_PLANETSCALE_NODE_BASIC_DATABASE_URL

const client = new Client({ url: connectionString })
const adapter = new PrismaPlanetScale(client)
const prisma = new PrismaClient({ adapter })

export async function handler() {
  await prisma.$executeRaw`SELECT 1`
}
