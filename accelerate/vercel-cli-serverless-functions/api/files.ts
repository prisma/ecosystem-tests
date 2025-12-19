const { Prisma } = require('./generated/client')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
  const dir = path.dirname(require.resolve('./generated/client'))
  const files = fs.readdirSync(dir)

  const data = {
    version: Prisma.prismaVersion.client,
    files,
  }

  return res.send(JSON.stringify({ data }))
}
