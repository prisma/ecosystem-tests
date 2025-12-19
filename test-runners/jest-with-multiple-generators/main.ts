import { PrismaClient } from './generated1/client'

async function main() {
  const prisma = new PrismaClient()

  const data = await prisma.user.findMany()
  console.log(data)
  prisma.$disconnect()
}

main()
