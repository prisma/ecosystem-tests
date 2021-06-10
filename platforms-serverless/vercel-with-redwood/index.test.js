const { request, gql } = require('graphql-request')
const pjson = require('./api/package.json')
const fs = require('fs')

// const endpoint = 'https://e2e-vercel-with-redwood.vercel.app/api/graphql'
// const endpoint = 'http://localhost:8911/graphql'

function getDeploymentURL(){
  const data = fs.readFileSync('./deployment-url.txt', {encoding: 'utf8'})
  console.log(data)
  return data.trim()
}
const endpoint = getDeploymentURL() + '/api/graphql'
console.log(`Testing: ${endpoint}`)

test('should test prisma version', async () => {
  const query = gql`
    query {
      prismaVersion
    }
  `
  const data = await request(endpoint, query)
  expect(data.prismaVersion).toEqual(pjson.dependencies['@prisma/client'])
})

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
})

test('should test .prisma/client files', async () => {
  const query = gql`
    query {
      files
    }
  `
  const data = await request(endpoint, query)
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
  expect(data.files).toMatchObject(files)
})
