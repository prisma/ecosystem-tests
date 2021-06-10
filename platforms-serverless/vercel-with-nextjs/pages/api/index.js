import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()
  const fs = require('fs')
  let files
  try {
    files = fs.readdirSync(
      process.env.LAMBDA_TASK_ROOT + '/node_modules/.prisma/client',
    )
  } catch (e) {
    files = e.message
  }
  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users,
    files
  })
}
