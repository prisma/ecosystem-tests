// @ts-check
import { Prisma, PrismaClient } from '@prisma/client'
import { WebSocket } from 'undici'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

neonConfig.webSocketConstructor = WebSocket

const connectionString = process.env.DRIVER_ADAPTERS_NEON_NODE_BASIC_DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export async function handler() {
  await prisma.$executeRaw`SELECT 1`
}
