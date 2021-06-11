const fetch = require('node-fetch')
const fs = require('fs')

function getDeploymentURL() {
  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  return data.trim()
}
// const endpoint = 'https://e2e-vercel-with-nextjs.vercel.app/api'
// const endpoint = 'http://localhost:3001/api'
const endpoint = getDeploymentURL() + '/api'

const pjson = require('./package.json')

test('prisma version and output', async () => {
  const r = await fetch(endpoint)
  const data = await r.json()
  const files =
    process.env.PRISMA_FORCE_NAPI === 'true'
      ? [
          'index.js',
          'libquery_engine_napi-rhel-openssl-1.0.x.so.node',
          'package.json',
          'schema.prisma',
        ]
      : [
          'index.js',
          'package.json',
          'query-engine-rhel-openssl-1.0.x',
          'schema.prisma',
        ]
  expect(data).toMatchObject({
    prismaVersion: pjson.dependencies['@prisma/client'],
    users: [],
    files: files,
  })
})

// TODO More testing here that the script actually works (see all the other tests)
