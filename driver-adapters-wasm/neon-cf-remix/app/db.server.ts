import { PrismaClient } from './generated/client'
import { PrismaNeon } from '@prisma/adapter-neon'

export function getDb(url: string) {
  return new PrismaClient({ adapter: new PrismaNeon({ connectionString: url }) })
}
