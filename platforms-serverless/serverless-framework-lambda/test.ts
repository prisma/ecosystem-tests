import { Prisma } from '@prisma/client'
import { invokeLambdaSync } from './utils'

const name = 'e2e-tests-serverless-lambda' // TODO rename to match project name again in AWS account

async function main() {
  console.log('testing function', name)
  const data = await invokeLambdaSync(name, '')
  console.log({ data: data.$response.data })

  const actual = (data.$response.data as any).Payload

  let engineString = ''
  if(process.env.PRISMA_FORCE_NAPI) {
    engineString = `,"files":["index-browser.js","index.d.ts","index.js","package.json","libquery_engine_napi-rhel-openssl-1.0.x.so.node","schema.prisma"]`
  } else {} 
    engineString = `,"files":["index-browser.js","index.d.ts","index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]`
  }

  const expect = `{"version":"${Prisma.prismaVersion.client}","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}${engineString}}`

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
