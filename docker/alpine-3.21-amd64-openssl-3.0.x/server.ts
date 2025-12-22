#!/usr/bin/env node

const express = require('express')
const app = express()
const port = 3000

const { PrismaClient } = require('./generated/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const connectionString = process.env.DATABASE_URL
const adapter = new PrismaPg({ connectionString })
const client = new PrismaClient({ adapter })

app.get('/', async (req, res) => {
  const data = await client.user.findMany()
  res.send(JSON.stringify(data))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
