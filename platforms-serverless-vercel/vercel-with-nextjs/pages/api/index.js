import { Prisma, PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()

  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users,
  })
}
