const { PrismaClient, Prisma } = require('@prisma/client')

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


  // node_modules\.prisma\client
  console.log("process.env.LAMBDA_TASK_ROOT", process.env.LAMBDA_TASK_ROOT)
  fs.readdir(process.env.LAMBDA_TASK_ROOT + "", function(err, items) {
    console.log("# content of process.env.LAMBDA_TASK_ROOT")
    console.log(items);
  })
  fs.readdir(process.env.LAMBDA_TASK_ROOT + "/src", function(err, items) {
    console.log("# content of process.env.LAMBDA_TASK_ROOT/src")
    console.log(items);
  })
  fs.readdir(process.env.LAMBDA_TASK_ROOT + "/src/functions", function(err, items) {
    console.log("# content of process.env.LAMBDA_TASK_ROOT/src/functions")
    console.log(items);
  })

  const files = []

  return {
    statusCode: 200,
    body: JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      deleteManyUsers,
      files
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
