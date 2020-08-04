const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
dotenv.config({
  path: 'prisma/.env',
})

const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_HEROKU_PGBOUNCER_URL,
    },
  },
})

const clientWithQueryStringParam = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_HEROKU_PGBOUNCER_URL + '?pgbouncer=true',
    },
  },
})

async function clientWithoutQueryStringParamCall() {
  const data = await client.user.findMany()
  return data
}

async function clientWithQueryStringParamCall() {
  const data = await clientWithQueryStringParam.user.findMany()
  return data
}

async function main() {
  try {
    const data1 = await client.user.findMany()
    console.log({ data1 })
    await client.disconnect()
    await client.connect()
    const data2 = await client.user.findMany()
    console.log({ data2 })
  } catch (e) {
    console.log(e)
  }

  const data3 = await clientWithQueryStringParam.user.findMany()
  console.log({ data3 })
  const data4 = await clientWithQueryStringParam.user.findMany()
  console.log({ data4 })
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
