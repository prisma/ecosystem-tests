import { PrismaClient, version } from '@prisma/client'

const client = new PrismaClient()

export async function handler() {
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
      id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await client.user.findOne({
    where: {
      id,
    },
  })

  const deleteManyUsers = await client.user.deleteMany({})

  return {
    version: version.client,
    createUser,
    updateUser,
    users,
    deleteManyUsers,
  }
}
