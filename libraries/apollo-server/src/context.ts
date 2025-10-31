import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

export interface Context {
  prisma: PrismaClient
}

export function createContext(): Context {
  return { prisma }
}
