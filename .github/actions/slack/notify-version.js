const post = require('./post')

async function run() {
	const url = process.env.webhook
	const version = process.env.version

	await post(url, `Prisma version ${version} released`)
}

run().catch((err) => {
	throw err
})
