// @ts-check
const { PrismaClient, Prisma } = require('@prisma/client')
const client = new PrismaClient()
const path = require('path')

const include = eval('require')

export default async (req, res) => {
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

  /*
  // list all files deployed in Lambda to debug when tests are failing
  const dirTree = require("directory-tree");
  const tree = dirTree(process.env.LAMBDA_TASK_ROOT);
  console.dir(tree, { depth: null });
  */

  // list all files in node_modules/.prisma/client
  const fs = require('fs')
  const generatedClientDir = path.dirname(include.resolve('.prisma/client', {
    paths: [path.dirname(include.resolve('@prisma/client'))]
  }))
  const files = fs.readdirSync(generatedClientDir)

  const payload = {
    version: Prisma.prismaVersion.client,
    createUser,
    updateUser,
    users,
    deleteManyUsers,
    files,
    // tree,
  }
  console.log({ payload })

  return res.send(JSON.stringify(payload))
}
