const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = async function () {
  console.log('connecting')
  await prisma.$connect()
  console.log('connected')
}
