const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()

const { PrismaClient, prismaVersion } = require('@prisma/client')
const client = new PrismaClient()

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  await client.user.deleteMany({})

  const id = Math.random().toString()
  fs.writeFileSync('./id.tmp', id)

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

  const users = await client.user.findOne({
    where: {
      id,
    },
  })

  const deleteManyUsers = await client.user.deleteMany()

  return res.send(
    JSON.stringify({
      version: prismaVersion.client,
      createUser,
      updateUser,
      users,
      deleteManyUsers,
    }),
  )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
