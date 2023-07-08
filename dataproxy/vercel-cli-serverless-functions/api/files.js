const { Prisma } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const dir = path.dirname(require.resolve('.prisma/client/package.json', {paths: [path.dirname(require.resolve('@prisma/client/package.json'))]}))
  const files = fs.readdirSync(dir)
  
  const data = {
    version: Prisma.prismaVersion.client,
    files,
  }

  return res.send(JSON.stringify({ data }))
}
