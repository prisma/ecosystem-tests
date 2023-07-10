import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate';

let prisma = new PrismaClient({})

if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
  prisma = prisma.$extends(withAccelerate()) as any
}

export async function getUsers() {
  // Do a query and disconnect
  // So we also test that connection is re-established in next query below
  console.debug(new Date(), "Start await prisma.user.findFirst()")
  console.time('findFirstTook');
  await prisma.user.findFirst()
  console.timeEnd('findFirstTook');
  console.debug(new Date(), "End await prisma.user.findFirst()")

  await prisma.$disconnect()

  console.debug(new Date(), "Start await prisma.$transaction")
  console.time('transactionTook');
  // query should re-connect automatically
  const data = await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])
  console.timeEnd('transactionTook');
  console.debug(new Date(), "End await prisma.$transaction")
  return data
}

