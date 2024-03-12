import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

export function getDb(url: string) {
  const pool = new Pool({ connectionString: url })
  return new PrismaClient({ adapter: new PrismaNeon(pool) })
}
