const { PrismaClient, Prisma } = require('./generated/client')

const client = new PrismaClient()

exports.handler = async function (event, context, callback) {
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

  const users = await client.user.findUnique({
    where: {
      id,
    },
  })

  const deleteManyUsers = await client.user.deleteMany()

  // list all files in node_modules/.prisma/client
  const fs = require('fs')
  const files = []
  
  console.log(process.env.LAMBDA_TASK_ROOT, fs.readdirSync(process.env.LAMBDA_TASK_ROOT))
  console.log(process.env.LAMBDA_TASK_ROOT + "/src", fs.readdirSync(process.env.LAMBDA_TASK_ROOT + "/src"))
  console.log(process.env.LAMBDA_TASK_ROOT + "/src/functions", fs.readdirSync(process.env.LAMBDA_TASK_ROOT + "/src/functions"))
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      deleteManyUsers,
      files,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
