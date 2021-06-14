import fs from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

const STUDIO_PORT = 5555
const SCHEMA_HASH = createHash('md5')
  .update(fs.readFileSync('./prisma/schema.prisma'))
  .digest('hex')

describe('Studio', () => {
  test('can load up the frontend correctly', async () => {
    let res = await fetch(`http://localhost:${STUDIO_PORT}`)
    expect(res.status).toBe(200)

    res = await fetch(`http://localhost:${STUDIO_PORT}/databrowser.js`)
    expect(res.status).toBe(200)

    res = await fetch(`http://localhost:${STUDIO_PORT}/index.css`)
    expect(res.status).toBe(200)
  })

  test.only('can make queries', async () => {
    const res = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
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
            query: 'prisma.user.findMany()',
          },
        },
      }),
    }).then((r) => r.json())

    expect(res).toMatchSnapshot()
  })

  test('can create records', async () => {
    const res = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: 2,
        channel: 'prisma',
        action: 'clientRequest',
        payload: {
          data: {
            schemaHash: SCHEMA_HASH,
            query: `prisma.user.create({
              data: {
                id: 3,
                name: 'Name 3',
                email: 'email3@test.com',
                parentId: 3,
              },
            })`,
          },
        },
      }),
    }).then((r) => r.json())

    expect(res).toMatchSnapshot()
  })

  test('can update records', async () => {
    const res = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: 3,
        channel: 'prisma',
        action: 'clientRequest',
        payload: {
          data: {
            schemaHash: SCHEMA_HASH,
            query: `prisma.user.update({
              where: { id: 1 },
              data: {
                name: 'Updated Name 1'
              },
            })`,
          },
        },
      }),
    }).then((r) => r.json())

    expect(res).toMatchSnapshot()
  })

  test('can delete records', async () => {
    const res = await fetch(`http://localhost:${STUDIO_PORT}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: 4,
        channel: 'prisma',
        action: 'clientRequest',
        payload: {
          data: {
            schemaHash: SCHEMA_HASH,
            query: `prisma.user.delete({
              where: { id: 2 }
            })`,
          },
        },
      }),
    }).then((r) => r.json())

    expect(res).toMatchSnapshot()
  })
})
