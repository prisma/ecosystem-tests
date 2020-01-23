const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const { PrismaClient } = require('@prisma/client')
const photon = new PrismaClient()

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  const createUser = await photon.user.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const updateUser = await photon.user.update({
    where: {
      id: createUser.id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await photon.user.findOne({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await photon.user.deleteMany()

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
