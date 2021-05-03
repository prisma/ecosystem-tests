const { client } = require('.')

describe('should test Prisma client and PgBouncer', () => {
  afterAll(async () => {
    await client.$disconnect()
  })

  it('should test auto-reconnect', async () => {
    const data = await client.user.findMany({
      where: {
        id: 'x',
      },
    })
    expect(data).toMatchSnapshot()

    await client.$disconnect()

    const data1 = await client.user.findMany({
      where: {
        id: 'x',
      },
    })
    expect(data1).toMatchSnapshot()
  })
})
