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

  test('can make queries', async () => {
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

  test('can make changes', async () => {
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
            query: `prisma.user.create({
              data: {
                id: 1,
                name: 'TestName',
                email: 'test@example.com',
                parent: {
                  create: {
                    id: 2,
                    name: 'ParentName',
                    email: 'parent@example.com',
                    parent: { connect: { id: 1 } },
                  },
                },
              },
            })`,
          },
        },
      }),
    }).then((r) => r.json())

    expect(res).toMatchSnapshot()
  })
})
