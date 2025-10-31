import { PrismaClient } from '../generated/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const users = await prisma.user.findFirst()
console.log(users)
