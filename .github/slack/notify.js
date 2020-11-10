const post = require('./post')

async function run() {
  const url = process.env.webhook
  let message = process.argv[2]

  const startTime = process.env.START_TIME
  if (Boolean(startTime)) {
    message = `${message} (Start Time: ${startTime})`
  }

  await post(url, message)
}

run().catch((err) => {
  throw err
})
