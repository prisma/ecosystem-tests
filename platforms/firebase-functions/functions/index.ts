import { PrismaClient } from '@prisma/client'
import * as functions from 'firebase-functions';

const client = new PrismaClient({
  log: ['info', 'query', 'warn'],
})

const func = functions.https.onRequest(async (req, res) => {
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
      id: createUser.id,
    },
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  const users = await client.user.findOne({
    where: {
      id: createUser.id,
    },
  })

  const deleteManyUsers = await client.user.deleteMany({})

  res.status(200).send({
    createUser,
    updateUser,
    users,
    deleteManyUsers,
  });
})

export { func }
