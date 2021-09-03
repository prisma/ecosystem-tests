const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

describe('prisma db seed', () => {
  it('successfully seeds the database', async () => {
    const users = await client.user.findMany()
    expect(users).toMatchSnapshot()
  })
})
