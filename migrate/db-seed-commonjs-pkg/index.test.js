const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

describe('prisma db seed', () => {
  it('successfully seeds the database', async () => {
    const users = await client.user.findMany()
    expect(users).toMatchInlineSnapshot(`
      Array [
        Object {
          "email": "alice@prisma.io",
          "id": 1,
          "name": "Alice",
        },
        Object {
          "email": "nilu@prisma.io",
          "id": 2,
          "name": "Nilu",
        },
        Object {
          "email": "mahmoud@prisma.io",
          "id": 3,
          "name": "Mahmoud",
        },
      ]
    `)
  })
})
