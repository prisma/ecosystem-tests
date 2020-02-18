const post = require('./post')

post(process.env.SLACK_WEBHOOK, `test message!`)
