const { request, gql } = require('graphql-request')
const pjson = require('./api/package.json')
const fs = require('fs')

function getDeploymentURL() {
  const data = fs.readFileSync('./deployment-url.txt', { encoding: 'utf8' })
  return data
}
// Library
// const endpoint = 'https://e2e-vercel-with-redwood.vercel.app/api/graphql'
// Binary
// const endpoint = 'https://e2e-vercel-with-redwood-binary.vercel.app/api/graphql'
// const endpoint = 'http://localhost:8911/graphql'
const endpoint = getDeploymentURL() + '/api/graphql'

test('should test prisma version', async () => {
  const query = gql`
    query {
      prismaVersion
    }
  `
  const data = await request(endpoint, query)
  expect(data.prismaVersion).toEqual(pjson.resolutions['@prisma/client'])
}, 10000)

test('should query graphql users', async () => {
  const query = gql`
    query {
      users {
        id
        email
        name
      }
    }
  `
  const data = await request(endpoint, query)
  expect(data).toMatchSnapshot()
}, 10000)

test('should test .prisma/client files', async () => {
  const query = gql`
    query {
      files
    }
  `
  const data = await request(endpoint, query)
  const files =
    process.env.PRISMA_CLIENT_ENGINE_TYPE === 'binary'
      ? [
          'deno',
          'edge.d.ts',
          'edge.js',
          'index-browser.js',
          'index.d.ts',
          'index.js',
          'package.json',
          'query-engine-rhel-openssl-1.0.x',
          'schema.prisma',
        ]
      : [
          'deno',
          'edge.d.ts',
          'edge.js',
          'index-browser.js',
          'index.d.ts',
          'index.js',
          'libquery_engine-rhel-openssl-1.0.x.so.node',
          'package.json',
          'schema.prisma',
        ]
  expect(data.files).toMatchObject(files)
  console.log(data.files)
})

// TODO More testing here that the script actually works (see all the other tests)
