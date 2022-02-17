process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const { CosmosClient } = require('@azure/cosmos')
const assert = require('assert')

async function test() {
  const client = new CosmosClient({
    endpoint: 'https://localhost:8081',
    key:
      'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='
  })

  const response = await client.getDatabaseAccount()
  assert(response)
  const { resources } = await client.databases.readAll().fetchAll()
  assert(resources.length === 0)
}

test().catch(e => {
  console.log('ERROR!!!', e)
  process.exit(1)
})