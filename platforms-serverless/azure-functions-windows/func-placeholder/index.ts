import { PrismaClient, Prisma } from '@prisma/client'
import { Context, HttpRequest } from '@azure/functions'

const client = new PrismaClient()

export default async function (context: Context, req: HttpRequest): Promise<void> {
  const createUser = await client.user.create({
    data: {
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

  const deleteUser = await client.user.delete({
    where: {
      id: createUser.id,
    },
  })

  context.res = {
    status: 200,
    body: JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      deleteUser,
    }),
  }

  context.done()
}
