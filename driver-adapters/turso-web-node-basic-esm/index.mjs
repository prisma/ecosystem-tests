// @ts-check
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql/web'

const connectionString = process.env.DRIVER_ADAPTERS_TURSO_NODE_BASIC_DATABASE_URL
const authToken = process.env.DRIVER_ADAPTERS_TURSO_NODE_BASIC_TOKEN

const adapter = new PrismaLibSql({ url: connectionString, authToken })
const prisma = new PrismaClient({ adapter })

export async function handler() {
  await prisma.$executeRaw`SELECT 1`
}
