const { IncomingWebhook } = require('@slack/webhook')

async function post(url, message, retries = 0) {
  try {
    const webhook = new IncomingWebhook(url)
    await webhook.send({
      text: message,
      icon_emoji: ':microscope:',
    })
  } catch (err) {
    if (retries <= 3) {
      await new Promise((r) => setTimeout(r, retries ** 2 * 1000))
      await post(url, message, retries + 1)
    } else {
      throw err
    }
  }
}

module.exports = post
