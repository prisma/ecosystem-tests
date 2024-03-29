const { PrismaClient } = require('@prisma/client')
const { withAccelerate } = require('@prisma/extension-accelerate')

let prisma = new PrismaClient()

if (process.env.DATAPROXY_FLAVOR === 'DP2+Extension') {
  prisma = prisma.$extends(withAccelerate())
}

module.exports = async (req, res) => {
  console.debug(new Date(), 'Start await prisma.$transaction')
  console.time('transactionTook')
  const data = await prisma.$transaction([prisma.user.findFirst(), prisma.user.findMany()])
  console.timeEnd('transactionTook')
  console.debug(new Date(), 'End await prisma.$transaction')

  return res.send(JSON.stringify({ data }))
}
