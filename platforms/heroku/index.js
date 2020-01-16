const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const { PrismaClient } = require('./prisma/prisma-client-js')
const photon = new PrismaClient()

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const createUser = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const updateUser = await photon.users.update({
    where: {
      id: createUser.id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await photon.users.findOne({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await photon.users.deleteMany()

  return res.send(
    JSON.stringify({
      createUser,
      updateUser,
      users,
      deleteManyUsers,
    }),
  )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
