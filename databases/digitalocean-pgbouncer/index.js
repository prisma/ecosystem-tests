const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
dotenv.config({
  path: 'prisma/.env',
})

const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_DO_PG_BOUNCER_URL,
    },
  },
})

const clientWithQueryStringParam = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_DO_PG_BOUNCER_URL + '?pgbouncer=true',
    },
  },
})

async function clientWithoutQueryStringParamCall() {
  await client.disconnect()
  await client.connect()
  const data = await client.user.findMany()
  return data
}

async function clientWithQueryStringParamCall() {
  await clientWithQueryStringParam.disconnect()
  await clientWithQueryStringParam.connect()
  const data = await clientWithQueryStringParam.user.findMany()
  return data
}

async function main() {
  const data1 = await client.user.findMany()
  console.log(data1)
  const data2 = await client.user.findMany()
  console.log(data2)

  const data3 = await clientWithQueryStringParam.user.findMany()
  console.log(data3)
  const data4 = await clientWithQueryStringParam.user.findMany()
  console.log(data4)
}

if (require.main === module) {
  main()
    .then((_) => { })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      client.disconnect()
      clientWithQueryStringParam.disconnect()
    })
}

module.exports = {
  clientWithoutQueryStringParamCall,
  clientWithQueryStringParamCall,
  client,
  clientWithQueryStringParam,
}
