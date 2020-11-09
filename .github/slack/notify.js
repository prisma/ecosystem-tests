const arg = require('arg')
const post = require('./post')

async function run() {
  const args = arg({
    'message-prefix': String,
  })

  const url = process.env.webhook
  let message = process.argv[2]

  const messagePrefix = args['message-prefix']

  const startTime = process.env.START_TIME
  if (Boolean(startTime)) {
    message = `${message} (Start Time: ${startTime})`
  }

  if (Boolean(messagePrefix) && Boolean(messagePrefix.trim())) {
    message = `${messagePrefix} ${message}`
  }

  await post(url, message)
}

run().catch((err) => {
  throw err
})
