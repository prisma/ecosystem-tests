const { Prisma } = require('@prisma/client')
const fs = require('fs')

export default async (req, res) => {
  const files = fs.readdirSync(process.env.LAMBDA_TASK_ROOT + "/node_modules/.prisma/client")
  
  const data = {
    version: Prisma.prismaVersion.client,
    files,
  }

  return res.send(JSON.stringify({ data }))
}
