#!/usr/bin/env node

const express = require('express')
const app = express()
const port = 3000

const { PrismaClient } = require('./generated/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const fs = require('fs')

const url = new URL(process.env.DATABASE_URL)
for (const key of ['sslmode', 'sslcert', 'sslidentity', 'sslpassword', 'sslaccept']) {
  url.searchParams.delete(key)
}

const adapter = new PrismaPg({
  connectionString: url.toString(),
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('./server-ca.pem').toString(),
    key: fs.readFileSync('./client-key.pem').toString(),
    cert: fs.readFileSync('./client-cert.pem').toString(),
  },
})
const client = new PrismaClient({ adapter })

app.get('/', async (req, res) => {
  const data = await client.user.findMany()
  res.send(JSON.stringify(data))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
