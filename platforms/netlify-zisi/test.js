//@ts-check
const originalFetch = require('node-fetch')

//@ts-ignore
const fetch = require('fetch-retry')(originalFetch, {
  retries: 15,
  retryDelay: 15 * 1000,
  retryOn: (attempt, error, response) => {
    // retry on any network error, or 4xx or 5xx status codes
    if (error !== null || response.status >= 400) {
      console.log(`retrying, attempt number ${attempt + 1}`)
      return true
    }
  },
})

async function main() {
  const r = await fetch(
    'https://prisma2-e2e-tests-netlify-zisi.netlify.app/.netlify/functions/index',
  )
  const data = await r.text()
  const packageJSON = require('./package.json')
  const prismaVersion = packageJSON['devDependencies']['@prisma/cli']
  const expectedData = `{"version":"${prismaVersion}","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}`
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
