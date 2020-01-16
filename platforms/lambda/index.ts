import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export async function handler() {
  const id = '12345'

  const createUser = await client.users.create({
    data: {
      id,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const updateUser = await client.users.update({
    where: {
      id: createUser.id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await client.users.findOne({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await client.users.deleteMany({})

  return {
    createUser,
    updateUser,
    users,
    deleteManyUsers,
  }
}
