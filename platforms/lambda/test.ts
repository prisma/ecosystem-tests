import { Prisma } from '@prisma/client'
import { invokeLambdaSync } from './utils'

const name = 'prisma2-e2e-tests'

async function main() {
  console.log('testing function', name)
  const data = await invokeLambdaSync(name, '')
  console.log({ data: data.$response.data })

  let original = JSON.parse((data.$response.data as any).Payload)  
  console.log("original", actual)
  delete original.measurements
  const actual = JSON.stringify(original)
  console.log("actual", actual)

  const expect =
    '{"version":"' +
    Prisma.prismaVersion.client +
    '","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'

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
