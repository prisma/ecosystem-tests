import { Prisma, PrismaClient } from '@prisma/client'
import execa from 'execa'

const prisma = new PrismaClient()

export default async (req, res) => {
  const fs = require('fs')
  const path = require('path')
  let files
  const { stdout } = await execa('tree')
  try {
    files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))
  } catch (e) {
    files = e.message + '\n' + stdout
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()
  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users,
    files: files,
  })
}
