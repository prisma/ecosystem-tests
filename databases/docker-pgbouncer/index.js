const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
dotenv.config({
  path: 'prisma/.env',
})

const client = new PrismaClient({
  datasources: {
    db: "postgresql://postgres:postgres@127.0.0.1:6433/blog?schema=public",
  }
})

const clientWithQueryStringParam = new PrismaClient({
  datasources: {
    db: "postgresql://postgres:postgres@127.0.0.1:6433/blog?schema=public&pgbouncer=true",
  }
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
  const data1 = await client.user.findMany()
  console.log(data1)
  const data2 = await clientWithQueryStringParam.user.findMany()
  console.log(data2)
}

if (require.main === module) {
  main()
    .then(_ => {
      client.disconnect()
      clientWithQueryStringParam.disconnect()
    })
    .catch(_ => {
      client.disconnect()
      clientWithQueryStringParam.disconnect()
    })
}

module.exports = {
  clientWithoutQueryStringParamCall,
  clientWithQueryStringParamCall,
  client,
  clientWithFlag,
}
