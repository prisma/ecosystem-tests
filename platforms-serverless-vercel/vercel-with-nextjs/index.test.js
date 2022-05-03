const fetch = require('node-fetch')
const fs = require('fs')

function getDeploymentURL() {
  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  return data.trim()
}
// const endpoint = 'https://e2e-vercel-with-nextjs.vercel.app/api'
// const endpoint = 'http://localhost:3001/api'
const endpoint = getDeploymentURL()

const pjson = require('./package.json')

test('prisma version and output', async () => {
  const r = await fetch(endpoint + '/api')
  const data = await r.json()
  expect(data).toMatchObject({
    prismaVersion: pjson.dependencies['@prisma/client'],
    users: [],
  })
})
test('generated client files', async () => {
  const r = await fetch(endpoint + '/api/files')
  const data = await r.json()
  const files =
    process.env.PRISMA_CLIENT_ENGINE_TYPE === 'binary'
      ? [
        'index.js',
        'package.json',
        'query-engine-rhel-openssl-1.0.x',
        'schema.prisma',
      ]
      : [
        'index.js',
        'libquery_engine-rhel-openssl-1.0.x.so.node',
        'package.json',
        'schema.prisma',
      ]
  expect(data).toMatchObject({
    files: files,
  })
})

// TODO More testing here that the script actually works (see all the other tests)
