import { PrismaClient, Prisma } from '@prisma/client'
const execa = require('execa');

const prisma = new PrismaClient()

let pscale
try {
  pscale = execa(
    'pscale', ['connect', 'e2e-tests', 'main', '--debug'],
    { env: process.env } // test if required
  )
  pscale.stdout.pipe(process.stdout);
  pscale.catch((err) => {
    console.log('pscale connect promise was rejected', err)
  })

  console.log("spawned `pscale connect` successfully")
  wait(3000)
  console.log("and waited 3 seconds for CLI hopefully to open the connection successfully")
} catch (error) {
  console.log('pscale connect error', error)
}

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const users = await prisma.user.findMany()
  res.status(200).json({
    prismaVersion: Prisma.prismaVersion.client,
    users,
  })
}
