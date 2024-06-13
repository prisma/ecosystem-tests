import fs from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

const STUDIO_PORT = 5555
let schemaHash: string

async function sendRequest(
  modelName: string,
  operation: string,
  args: Record<string, any>,
) {
  const response = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify({
      requestId: 1,
      channel: 'prisma',
      action: 'clientRequest',
      payload: {
        data: {
          schemaHash,
          modelName,
          operation,
          args,
        },
      },
    }),
  })

  return response.json()
}

beforeAll(async () => {
  const response = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify({
      requestId: 1,
      channel: 'prisma',
      action: 'getDMMF',
      payload: {}
    }),
  })

  const data = await response.json()
  schemaHash = data?.payload?.data.schemaHash
  expect(schemaHash).toBeDefined()
})


describe('Studio', () => {
  test('can load up the frontend correctly', async () => {
    let res = await fetch(`http://localhost:${STUDIO_PORT}`)
    expect(res.status).toBe(200)

    res = await fetch(`http://localhost:${STUDIO_PORT}/assets/index.js`)
    expect(res.status).toBe(200)

    res = await fetch(`http://localhost:${STUDIO_PORT}/http/databrowser.js`)
    expect(res.status).toBe(200)
  })

  test('can make queries', async () => {
    expect(await sendRequest('user', 'findMany', {})).toMatchSnapshot()
  })

  test('can create records', async () => {
    // Create record
    expect(
      await sendRequest('user', 'create', {
        data: {
          id: 3,
          name: 'Name 3',
          email: 'email3@test.com',
        },
      }),
    ).toMatchSnapshot()

    // Verify if record was created
    expect(
      await sendRequest('user', 'findUnique', { where: { id: 3 } }),
    ).toMatchSnapshot()
  })

  test('can update records', async () => {
    // Update record
    expect(
      await sendRequest('user', 'update', {
        where: { id: 1 },
        data: {
          name: 'Updated Name 1',
        },
      }),
    ).toMatchSnapshot()

    // Verify update
    expect(
      await sendRequest('user', 'findUnique', { where: { id: 1 } }),
    ).toMatchSnapshot()
  })

  test('can delete records', async () => {
    // Delete record
    expect(
      await sendRequest('user', 'delete', {
        where: { id: 2 },
      }),
    ).toMatchSnapshot()

    // Verify delete
    expect(
      await sendRequest('user', 'findUnique', { where: { id: 2 } }),
    ).toMatchSnapshot()
  })
})
