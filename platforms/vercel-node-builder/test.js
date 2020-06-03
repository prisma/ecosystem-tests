//@ts-check
const originalFetch = require('node-fetch')

const packageJSON = require('./package.json')
const prismaVersion = packageJSON['devDependencies']['@prisma/cli']
let expectedData = `{"version":"${prismaVersion}","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}`

let rdata = null

//@ts-ignore
const fetch = require('fetch-retry')(originalFetch, {
  retries: 15,
  retryDelay: 15 * 1000,
  retryOn: (attempt, error, response) => {
    if (attempt >= 15) {
      return false
    }
    const r = response.clone()

    // Because https://github.com/jonbern/fetch-retry/issues/29
    // It is okay for us to pass the test in the next run
    r.text().then((data) => {
      rdata = data
    })

    if (
      error !== null ||
      r.status != 200 ||
      JSON.stringify(rdata) !== JSON.stringify(expectedData)
    ) {
      console.log(`retrying, attempt number ${attempt + 1}`)
      return true
    } else {
      return false
    }
  },
})

async function main() {
  const r = await fetch('https://vercel-node-builder.now.sh/')
  const data = await r.text()
  if (JSON.stringify(data) !== JSON.stringify(expectedData)) {
    console.log(
      `expected '${JSON.stringify(expectedData)}', got '${JSON.stringify(
        data,
      )}'`,
    )
    process.exit(1)
  } else {
    console.log('Success')
    process.exit(0)
  }
}

if (require.main === module) {
  main()
}
