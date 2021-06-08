import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const fs = require('fs')
  const path = require('path')
  const files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()
  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users,
    files
  })
}
