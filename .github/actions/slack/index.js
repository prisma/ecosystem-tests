const core = require('@actions/core')
const github = require('@actions/github');

(async () => {
	const { IncomingWebhook } = require('@slack/webhook')
	const url = core.getInput('webhook')
	const message = core.getInput('message')
	const status = core.getInput('status')

	let emoji = ':heavy_multiplication_x:'

	if (status === 'success') {
		emoji = ':white_check_mark:'
	} else if (status === 'failure') {
		emoji = ':x:'
	}

	const webhook = new IncomingWebhook(url)
	await webhook.send({
		text: emoji + ' ' + message,
	})
})().catch((err) => {
	core.setFailed(err.message)
})
