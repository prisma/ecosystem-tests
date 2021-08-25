import { Context, HttpRequest } from '@azure/functions'
import { Prisma, PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export = async function (context: Context, req: HttpRequest): Promise<void> {
  const fs = require('fs')
  const path = require('path')
  const files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))

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
      files
    }),
  }

  context.done()
}
