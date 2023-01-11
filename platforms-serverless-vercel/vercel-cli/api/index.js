const { PrismaClient, Prisma } = require('@prisma/client')
const cp = require('child_process')
const { promisify } = require('util')
const exec = promisify(cp.exec)

async function execWithoutError(cmd) {
  try {
    const { stdout } = await exec(cmd)
    return stdout
  } catch (e) {
    console.log('error while executing', cmd)
    console.error(e)
    return 'EXEC_ERROR'
  }
}

const client = new PrismaClient()

export default async (req, res) => {
  // this is a subset of commands run in prisma/prisma by getPlatform.ts
  try {
    const uname = await execWithoutError('uname -m')
    console.log('uname:', uname)

    const libsslSpecific1 = await execWithoutError('ls -r /lib64 | grep libssl.so')
    console.log('libsslSpecific1:', libsslSpecific1)

    const libsslSpecific2 = await execWithoutError('ls -r /usr/lib64 | grep libssl.so')
    console.log('libsslSpecific2:', libsslSpecific2)

    const ldconfig = await execWithoutError('ldconfig -p | sed "s/.*=>s*//" | sed "s/.*///" | grep ssl | sort -r')
    console.log('ldconfig:', ldconfig)

    const openssl = await execWithoutError('openssl version -v')
    console.log('openssl:', openssl)
  } catch (e) {
    console.error(e)
  }

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
  const files = fs.readdirSync(process.env.LAMBDA_TASK_ROOT + "/node_modules/.prisma/client")
  
  const payload = {
    version: Prisma.prismaVersion.client,
    createUser,
    updateUser,
    users,
    deleteManyUsers,
    files,
    //tree,
  }
  console.log({ payload })

  return res.send(
    JSON.stringify(payload),
  )
}
