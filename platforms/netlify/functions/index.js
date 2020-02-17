const { PrismaClient } = require('./generated/client')

const client = new PrismaClient()

exports.handler = async function(event, context, callback) {
  await client.user.deleteMany({})

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

  const users = await client.user.findOne({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await client.user.deleteMany()

  return {
    statusCode: 200,
    body: JSON.stringify({
      createUser,
      updateUser,
      users,
      deleteManyUsers,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
