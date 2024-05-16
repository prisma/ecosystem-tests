const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

describe('prisma db seed', () => {
  it('successfully seeds the database', async () => {
    const users = await client.user.findMany()
    expect(users).toMatchInlineSnapshot(`
      [
        {
          "email": "alice@prisma.io",
          "id": 1,
          "name": "Alice",
        },
        {
          "email": "nilu@prisma.io",
          "id": 2,
          "name": "Nilu",
        },
        {
          "email": "mahmoud@prisma.io",
          "id": 3,
          "name": "Mahmoud",
        },
      ]
    `)
  })
})
