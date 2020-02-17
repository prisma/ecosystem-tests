const core = require('@actions/core')
const github = require('@actions/github');

(async () => {
	const { IncomingWebhook } = require('@slack/webhook')
	const url = core.getInput('webhook')
	const message = core.getInput('message')
	const status = core.getInput('status')
	const sha = process.env.GITHUB_SHA

	let emoji = ':heavy_multiplication_x:'

	if (status === 'success') {
		emoji = ':white_check_mark:'
	} else if (status === 'failure') {
		emoji = ':x:'
	}

	const webhook = new IncomingWebhook(url)
	await webhook.send({
		text: `\`${sha}\`: ${emoji} ${message}`,
	})
})().catch((err) => {
	core.setFailed(err.message)
})
