import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()

  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users
  })
}
