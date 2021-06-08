import { Prisma, PrismaClient } from '@prisma/client'
const https = require('https')

const prisma = new PrismaClient()

function debug(d) {
  const data = JSON.stringify(d)
  const options = {
    hostname: 'enj3c2foo1tt7f6.m.pipedream.net',
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }

  const req = https.request(options)
  req.write(data)
  req.end()
}
export default async (req, res) => {
  const fs = require('fs')
  const path = require('path')
  const files = fs.readdirSync(path.dirname(require.resolve('.prisma/client')))
  debug(files)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()
  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users,
    files: files,
  })
}
