export default async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const fs = require('fs')
  let files
  try {
    files = fs.readdirSync(
      process.env.LAMBDA_TASK_ROOT + '/node_modules/.prisma/client',
    )
  } catch (e) {
    files = e.message
  }
  res.status(200).json({
    files
  })
}
