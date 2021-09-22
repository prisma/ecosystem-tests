import fs from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

const STUDIO_PORT = 5555
const SCHEMA_HASH = createHash('md5')
  .update(fs.readFileSync('./prisma/schema.prisma'))
  .digest('hex')

async function sendRequest(query: string) {
  const response = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requestId: 1,
      channel: 'prisma',
      action: 'clientRequest',
      payload: {
        data: {
          schemaHash: SCHEMA_HASH,
          query,
        },
      },
    }),
  })

  return response.json()
}

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
    expect(await sendRequest('prisma.user.findMany()')).toMatchSnapshot()
  })

  test('can create records', async () => {
    // Create record
    expect(
      await sendRequest(
        `prisma.user.create({
          data: {
            id: 3,
            name: 'Name 3',
            email: 'email3@test.com',
          },
        })`,
      ),
    ).toMatchSnapshot()

    // Verify if record was created
    expect(
      await sendRequest('prisma.user.findUnique({ where: { id: 3 } })'),
    ).toMatchSnapshot()
  })

  test('can update records', async () => {
    // Update record
    expect(
      await sendRequest(
        `prisma.user.update({
          where: { id: 1 },
          data: {
            name: 'Updated Name 1',
          },
        })`,
      ),
    ).toMatchSnapshot()

    // Verify update
    expect(
      await sendRequest('prisma.user.findUnique({ where: { id: 1 } })'),
    ).toMatchSnapshot()
  })

  test('can delete records', async () => {
    // Delete record
    expect(
      await sendRequest(
        `prisma.user.delete({
          where: { id: 2 }
        })`,
      ),
    ).toMatchSnapshot()

    // Verify delete
    expect(
      await sendRequest('prisma.user.findUnique({ where: { id: 2 } })'),
    ).toMatchSnapshot()
  })
})
