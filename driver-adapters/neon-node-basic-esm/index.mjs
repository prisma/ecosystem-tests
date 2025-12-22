// @ts-check
import { Prisma, PrismaClient } from './generated/client'
import { WebSocket } from 'undici'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

neonConfig.webSocketConstructor = WebSocket

const connectionString = process.env.DRIVER_ADAPTERS_NEON_NODE_BASIC_DATABASE_URL

const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

export async function handler() {
  await prisma.$executeRaw`SELECT 1`
}
