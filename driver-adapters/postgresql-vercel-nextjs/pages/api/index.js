import { Prisma, PrismaClient } from '@prisma/client'
import { createPgConnector } from '@jkomyno/prisma-pg-js-connector'

const connectionString = process.env.DATABASE_URL

const jsConnector = createPgConnector({
  url: connectionString,
})

const prisma = new PrismaClient({ jsConnector })

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()

  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users
  })
}
