import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

export default async (req, res) => {
  const data = await prisma.$transaction([
    prisma.user.findFirst(),
    prisma.user.findMany()
  ])

  const json = JSON.stringify({ data })

  return res.send(json)
}

// export default async (req, res) => {
//   await client.user.deleteMany({})

//   const id = '12345'

//   const createUser = await client.user.create({
//     data: {
//       id,
//       email: 'alice@prisma.io',
//       name: 'Alice',
//     },
//   })

//   const updateUser = await client.user.update({
//     where: {
//       id,
//     },
//     data: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//     },
//   })

//   const users = await client.user.findUnique({
//     where: {
//       id,
//     },
//   })

//   const deleteManyUsers = await client.user.deleteMany()

//   /*
//   // list all files deployed in Lambda to debug when tests are failing
//   const dirTree = require("directory-tree");
//   const tree = dirTree(process.env.LAMBDA_TASK_ROOT);
//   console.dir(tree, { depth: null });
//   */

//   // list all files in node_modules/.prisma/client
//   const fs = require('fs')
//   const files = fs.readdirSync(process.env.LAMBDA_TASK_ROOT + "/node_modules/.prisma/client")
  
//   const payload = {
//     version: Prisma.prismaVersion.client,
//     createUser,
//     updateUser,
//     users,
//     deleteManyUsers,
//     files,
//     //tree,
//   }
//   console.log({ payload })

//   return res.send(
//     JSON.stringify(payload),
//   )
// }
