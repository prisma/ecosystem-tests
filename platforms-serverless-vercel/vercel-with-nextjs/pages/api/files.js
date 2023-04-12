const path = require('path')

const include = eval('require')

export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const fs = require('fs')
  let files
  try {
    const generatedClientDir = path.dirname(include.resolve('.prisma/client', {
      paths: [path.dirname(include.resolve('@prisma/client'))]
    }))
    files = fs.readdirSync(generatedClientDir)
  } catch (e) {
    files = e.message
  }
  res.status(200).json({
    files
  })
}
