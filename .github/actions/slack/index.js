const core = require('@actions/core')
const post = require('./post')

async function run() {
	const url = core.getInput('webhook')
	const message = core.getInput('message')
	const status = core.getInput('status').toLowerCase()
	const sha = process.env.GITHUB_SHA.substring(0, 7)

	let emoji = ':heavy_multiplication_x:'

	if (status === 'success') {
		emoji = ':white_check_mark:'
	} else if (status === 'failure') {
		emoji = ':x:'
	}

	post(url, `\`${sha}\`: ${emoji} ${message}`)
}

run().catch((err) => {
	core.setFailed(err.message)
})
