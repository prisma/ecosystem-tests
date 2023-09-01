import { Prisma as PrismaNamespace } from '@prisma/client'
import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const prismaVersion = () => {
  return PrismaNamespace.prismaVersion.client
}
export const files = () => {
  // list all files in node_modules/.prisma/client
  const fs = require('fs')
  const path = require('path')
  let files
  try {
    files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))
  } catch (e) {
    files = [e.message]
  }
  return files
}


export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: info function`)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      users: await users(),
      files: files(),
      prismaVersion: prismaVersion(),
    }),
  }
}
