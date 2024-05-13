const express = require('express')
const fs = require('fs')
const path = require('path')

const { PrismaClient, Prisma } = require('./prisma/generated/client')
const client = new PrismaClient()

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  // const prismaDirPathToFind = '.prisma/client'
  const prismaDirPathToFind = './prisma/generated/client'
  let actualPrismaDirPath = ''
  let files = []
  try {
    actualPrismaDirPath = path.dirname(require.resolve(prismaDirPathToFind))
    files = fs.readdirSync(actualPrismaDirPath)
  } catch (e) {
    console.error('require.resolve() or readdirSync() failed', e)
  } finally {
    console.debug({ actualPrismaDirPath })
    console.debug({ files })
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
  return res.send(
    JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      deleteManyUsers,
      files: files,
    }),
  )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
