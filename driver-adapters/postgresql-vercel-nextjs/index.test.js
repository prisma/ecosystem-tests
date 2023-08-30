const fetch = require('node-fetch')
const fs = require('fs')

let endpoint
function getDeploymentURL() {
  if (endpoint) return endpoint

  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  endpoint = data.trim()

  return endpoint
}

const pjson = require('./package.json')

test('prisma version and output', async () => {
  const r = await fetch(getDeploymentURL() + '/api')
  const data = await r.json()
  expect(data).toMatchObject({
    prismaVersion: pjson.dependencies['@prisma/client'],
    users: [],
  })
})
