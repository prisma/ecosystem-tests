import { prismaVersion as pVersion } from '@prisma/client'

export const prismaVersion = () => {
  return pVersion.client
}
