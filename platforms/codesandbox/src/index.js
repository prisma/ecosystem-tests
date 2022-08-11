const express = require('express')
const { PrismaClient, Prisma } = require('@prisma/client')
const client = new PrismaClient()
const app = express()

app.get('/', async (req, res) => {
  const fs = require('fs')
  const path = require('path')
  const files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))

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

  return res.send(
    JSON.stringify({
      version: Prisma.prismaVersion.client,
      createUser,
      updateUser,
      users,
      files,
    }),
  )
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}!`))
