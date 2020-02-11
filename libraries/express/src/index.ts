import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.get('/ensure-user', async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
      },
    })
  } catch (err) {}
  res.send({})
})

app.get('/user', async (req, res) => {
  const result = await prisma.user.findMany({
    where: {
      email: 'john@example.com',
    },
  })
  res.json(result)
})

app.listen(3000, () =>
  console.log('listening on http://localhost:3000'),
)
