import arg from 'arg'
import { diff } from 'jest-diff'
import originalFetch from 'node-fetch'

function getExpectedData(prismaVersion: string, binaryString = '') {
  return `{"version":"${prismaVersion}","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}${binaryString}}`
}

let rdata = null

function getFetch(expectedData: string) {
  const RETRIES = 15
  const RETRIES_DELAY = 5
  const fetch = require('fetch-retry')(originalFetch, {
    retryDelay: RETRIES_DELAY * 1000,
    retryOn: (attempt, error, response) => {
      if (attempt >= RETRIES) {
        return false
      }

      const r = response.clone()
      // Because https://github.com/jonbern/fetch-retry/issues/29
      // It is okay for us to pass the test in the next run
      r.text().then((data) => {
        rdata = data
      })

      if (error !== null || r.status != 200 || JSON.stringify(rdata) !== JSON.stringify(expectedData)) {
        console.log(`retrying, attempt number ${attempt + 1}`)
        return true
      } else {
        return false
      }
    },
  })
  return fetch
}

interface FetchRetryArgs {
  url: string
  prismaVersion: string
  binaryString: string
}

async function fetchRetry(args: FetchRetryArgs) {
  const expectedData = getExpectedData(args.prismaVersion, args.binaryString)
  const r = await getFetch(expectedData)(args.url)
  const data = await r.text()

  if (JSON.stringify(data) !== JSON.stringify(expectedData)) {
    console.log('diff:')
    console.log(diff(expectedData, data))
    console.log('expected:')
    console.log(JSON.stringify(expectedData))
    console.log('but got:')
    console.log(JSON.stringify(data))
    process.exit(1)
  } else {
    console.log('Success:')
    console.log(JSON.stringify(data))
    process.exit(0)
  }
}

if (require.main === module) {
  const args = arg({
    '--url': String,
    '--prisma-version': String,
    '--binary-string': String,
  })

  const url = args['--url']
  const prismaVersion = args['--prisma-version']
  const binaryString = args['--binary-string']
  console.log({
    url,
    prismaVersion,
    binaryString,
  })
  fetchRetry({
    url,
    prismaVersion,
    binaryString,
  })
}
