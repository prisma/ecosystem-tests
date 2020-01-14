import { invokeLambdaSync } from './utils'

const name = 'prisma2-e2e-tests'

async function main() {
	const data = await invokeLambdaSync(name, '')
	console.log({ data: data.$response.data })
	const actual = (data.$response.data as any).Payload
	const expect = '{"what":"is up"}'
	if (actual !== expect) {
		console.log('expected', expect, 'but got', actual)
		process.exit(1)
	}
	console.log('test succeeded')
}

main().catch((err) => {
	console.log(err)
	process.exit(1)
})
