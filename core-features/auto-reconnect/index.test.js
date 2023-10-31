const { client } = require('.')

describe('Prisma Client', () => {
  afterAll(async () => {
    await client.$disconnect()
  })

  it('should auto-reconnect after $disconnect', async () => {
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
