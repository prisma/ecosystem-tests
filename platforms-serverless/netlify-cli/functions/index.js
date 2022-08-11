const { PrismaClient, Prisma } = require('./generated/client')

const client = new PrismaClient()

exports.handler = async function (event, context, callback) {
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
    where: { id: createUser.id },
  })

  // list all files in node_modules/.prisma/client
  const fs = require('fs')
  const files = fs.readdirSync(process.env.LAMBDA_TASK_ROOT + '/generated/client')

  return {
    statusCode: 200,
    body: JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      files,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
