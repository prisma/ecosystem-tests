import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

export default async (req, res) => {
  const data = await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])

  return res.send(JSON.stringify({ data }))
}
