import { Prisma } from '@prisma/client'
import { invokeLambdaSync } from './utils'
const process = require('process')

const name = 'prisma2-e2e-tests'

async function main() {
  console.log('testing function', name)
  const measure_start = process.hrtime.bigint()
  const data = await invokeLambdaSync(name, '')
  const measure_end = process.hrtime.bigint()
  console.log(
    'function invocation duration:',
    Number(measure_end - measure_start) / 1000000000,
  )

  console.log({ data: data.$response.data })

  let original = JSON.parse((data.$response.data as any).Payload)
  console.log('original', original)
  delete original.measurements
  const actual = JSON.stringify(original)
  console.log('actual', actual)
  let files = `,"files":["index-browser.js","index.d.ts","index.js","package.json","query-engine-debian-openssl-1.1.x","query-engine-rhel-openssl-1.0.x","schema.prisma"]`
  if (process.env.PRISMA_FORCE_NAPI === 'true') {
    files = `,"files":["index-browser.js","index.d.ts","index.js","package.json","libquery_engine_napi-debian-openssl-1.1.x.so.node","libquery_engine_napi-rhel-openssl-1.0.x.so.node","schema.prisma"]`
  }
  const expect =
    '{"version":"' +
    Prisma.prismaVersion.client +
    `","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}${files}}`

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
