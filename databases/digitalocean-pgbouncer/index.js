const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
dotenv.config({
  path: 'prisma/.env',
})

const client = new PrismaClient()

const clientWithFlag = new PrismaClient({
  forceTransactions: true,
})

async function clientWithoutFlagCall() {
  const data = await client.user.findMany()
  return data
}

async function clientWithFlagCall() {
  const data = await clientWithFlag.user.findMany()
  return data
}

async function main() {
  const data1 = await client.user.findMany()
  console.log(data1)
  const data2 = await clientWithFlag.user.findMany()
  console.log(data2)
}

if (require.main === module) {
  main()
    .then(_ => {
      client.disconnect()
      clientWithFlag.disconnect()
    })
    .catch(_ => {
      client.disconnect()
      clientWithFlag.disconnect()
    })
}

module.exports = {
  clientWithoutFlagCall,
  clientWithFlagCall,
  client,
  clientWithFlag,
}
