const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const { PrismaClient, prismaVersion } = require('@prisma/client')

const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PGBOUNCER,
    },
  },
})

const clientWithQueryStringParam = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_HEROKU_PGBOUNCER_URL + '?pgbouncer=true',
    },
  },
})

const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
  try {
    await client.user.findMany()
    await client.disconnect()
    await client.connect()
    await client.user.findMany()
    process.exit(1) // The code should never reach here
  } catch (e) {
    console.log(e)
  }

  await clientWithQueryStringParam.user.deleteMany({})
  const id = '12345'
  const createUser = await clientWithQueryStringParam.user.create({
    data: {
      id,
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  const updateUser = await clientWithQueryStringParam.user.update({
    where: {
      id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })
  const users = await clientWithQueryStringParam.user.findOne({
    where: {
      id,
    },
  })

  /*
  * Query engine instance names prepared statements serially s0, s1 and so on. Without the `pgbouncer=true` flag, 
  * prepared statements are not cleaned up in PgBouncer. By doing disconnect/reconnect, we get a 
  * new instance of query engine that starts again at s0. And we expect the next client call to throw
  * "prepared statement s0 already exists"
  */
  await client.disconnect()
  await client.connect()

  await clientWithQueryStringParam.user.findOne({
    where: {
      id,
    },
  })
  const deleteManyUsers = await clientWithQueryStringParam.user.deleteMany()
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
