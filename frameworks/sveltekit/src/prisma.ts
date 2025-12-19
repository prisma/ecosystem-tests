import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

export let prisma: PrismaClient

prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})
