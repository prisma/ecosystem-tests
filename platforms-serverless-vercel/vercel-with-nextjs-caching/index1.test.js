const fetch = require('node-fetch')
const fs = require('fs')

function getDeploymentURL() {
  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  return data.trim()
}

const endpoint = getDeploymentURL()

const DELAY = 5000
let backOff = -DELAY

test('simple query', async () => {
  await new Promise((r) => setTimeout(r, backOff += DELAY))

  const r = await fetch(endpoint + '/api')
  const data = await r.json().catch((e) => e)

  expect(data).toMatchObject({
    value: expect.stringContaining(`Prisma has detected that this project was built on Vercel, which caches dependencies.`),
  })
})

jest.retryTimes(10, { logErrorsBeforeRetry: true })
jest.setTimeout(10 * DELAY)
