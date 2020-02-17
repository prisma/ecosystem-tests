const core = require('@actions/core');

(async () => {
	const { IncomingWebhook } = require('@slack/webhook');
	const url = core.getInput('webhook');
	const message = core.getInput('message')

	const webhook = new IncomingWebhook(url);
	await webhook.send({
		text: message,
	});
})().catch((err) => {
	core.setFailed(err.message);
});
