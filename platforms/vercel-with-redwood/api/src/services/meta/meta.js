import { Prisma } from '@prisma/client'

export constPrisma= () => {
  return Prisma.prismaVersion.client
}
