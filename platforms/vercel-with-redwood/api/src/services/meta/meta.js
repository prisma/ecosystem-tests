import { Prisma as PrismaNamespace } from '@prisma/client'

export const prismaVersion = () => {
  return PrismaNamespace.prismaVersion.client
}
