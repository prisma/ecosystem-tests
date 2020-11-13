import { Prisma as PrismaNamespace } from '@prisma/client'

export const Prisma = () => {
  return PrismaNamespace.prismaVersion.client
}
