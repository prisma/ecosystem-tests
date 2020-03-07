import { invokeLambdaSync } from './utils'
import { version } from '@prisma/client'

const name = 'slsLambda'

async function main() {
	console.log('testing function', name)
	const data = await invokeLambdaSync(name, '')
	console.log({ data: data.$response.data })

	const actual = (data.$response.data as any).Payload
	const expect = `{"version":"${version}","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}`

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
