import { Prisma as PrismaNamespace } from '@prisma/client'

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
