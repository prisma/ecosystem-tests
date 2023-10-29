const { PrismaClient } = require('@prisma/client')
const { Client } = require('pg')

const pgBouncerMetaClient = new Client("postgresql://postgres:postgres@127.0.0.1:6433/pgbouncer")

const client1WithoutQueryStringParam = new PrismaClient({
  errorFormat: 'colorless',
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@127.0.0.1:6433/blog',
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})
const client2WithoutQueryStringParam = new PrismaClient({
  errorFormat: 'colorless',
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@127.0.0.1:6433/blog',
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})

const client1WithQueryStringParam = new PrismaClient({
  errorFormat: 'colorless',
  datasources: {
    db: {
      url:
        'postgresql://postgres:postgres@127.0.0.1:6433/blog?pgbouncer=true',
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})
const client2WithQueryStringParam = new PrismaClient({
  errorFormat: 'colorless',
  datasources: {
    db: {
      url:
        'postgresql://postgres:postgres@127.0.0.1:6433/blog?pgbouncer=true',
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})

async function client1WithoutQueryStringParamCall() {
  const data = await client1WithoutQueryStringParam.user.findMany()
  return data
}
async function client2WithoutQueryStringParamCall() {
  const data = await client2WithoutQueryStringParam.user.findMany()
  return data
}

async function client1WithQueryStringParamCall() {
  const data = await client1WithQueryStringParam.user.findMany()
  return data
}
async function client2WithQueryStringParamCall() {
  const data = await client2WithQueryStringParam.user.findMany()
  return data
}

async function main() {
  await pgBouncerMetaClient.connect()
  let query0 = await pgBouncerMetaClient.query('SHOW VERSION;')
  console.log(query0.rows)

  try {
    // try-catch because this is expected to fail
    const data1 = await client1WithoutQueryStringParam.user.findMany()
    console.log({ data1 })

    /*
     * Query engines instances name prepared statements serially s0, s1 and so on. Without the `pgbouncer=true` flag,
     * prepared statements are not cleaned up in PgBouncer. By using different Clients, we expect the both instances to use s0
     * The conflicting client call should throw "prepared statement s0 already exists"
     */
    const data2 = await client2WithoutQueryStringParam.user.findMany({ where: { name: "second client" }})
    console.log({ data2 })
  } catch (e) {
    console.log(e)
  }

  const data3 = await client1WithQueryStringParam.user.findMany()
  console.log({ data3 })

  /*
   * With pgbouncer mode, this should not happen
   */
  const data4 = await client2WithQueryStringParam.user.findMany()
  console.log({ data4 })
}

if (require.main === module) {
  main()
    .then((_) => {})
    .catch((e) => {
      console.log(e)
    })
    .finally(async () => {
      await client1WithoutQueryStringParam.$disconnect()
      await client2WithoutQueryStringParam.$disconnect()
      await client1WithQueryStringParam.$disconnect()
      await client2WithQueryStringParam.$disconnect()
      await pgBouncerMetaClient.end()
    })
}

module.exports = {
  client1WithoutQueryStringParamCall,
  client2WithoutQueryStringParamCall,
  client1WithQueryStringParamCall,
  client2WithQueryStringParamCall,
  client1WithoutQueryStringParam,
  client2WithoutQueryStringParam,
  client1WithQueryStringParam,
  client2WithQueryStringParam,
  pgBouncerMetaClient,
}
