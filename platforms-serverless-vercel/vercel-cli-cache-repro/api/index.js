// @ts-check
const { PrismaClient, Prisma } = require('@prisma/client')
const client = new PrismaClient()

export default async (req, res) => {
  console.log('Runtime')
  // console.log(process.platform);
  // console.log(process.release);
  // console.log(process.config);
  // console.log(process.env);

  try {
    process.env.DEBUG = '*'

    await client.user.findMany({
      where: {
        id: '123',
        email: 'alice@prisma.io',
        name: 'Alice',
      },
    })
  } catch (e) {
    console.log(e.message)
    return res.status(500).json({ error: e.message })
  }

  // return res.status(200).json({ ok: true })

  /*
  // list all files deployed in Lambda to debug when tests are failing
  const dirTree = require("directory-tree");
  const tree = dirTree(process.env.LAMBDA_TASK_ROOT);
  console.dir(tree, { depth: null });
  */

  // list all files in node_modules/.prisma/client
  const fs = require('fs')
  const files = fs.readdirSync(process.env.LAMBDA_TASK_ROOT + '/node_modules/.prisma/client')

  const payload = {
    version: Prisma.prismaVersion.client,
    files,
    // tree,
  }
  console.log({ payload })

  return res.send(JSON.stringify(payload))
}
