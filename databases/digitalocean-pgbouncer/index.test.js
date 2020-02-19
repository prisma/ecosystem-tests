const {
  clientWithoutFlagCall,
  clientWithFlagCall,
  client,
  clientWithFlag,
} = require('.')

describe('should test Prisma client and pgBouncer', () => {
  afterAll(async () => {
    await client.disconnect()
    await clientWithFlag.disconnect()
    return
  })

  it('should work with default do pg bouncer without the forcedTransactions flag', async () => {
    const data = await clientWithoutFlagCall()
    expect(data).toMatchSnapshot()
  })

  it('should work with default do pg bouncer with the forcedTransactions flag', async () => {
    const data = await clientWithFlagCall()
    expect(data).toMatchSnapshot()
  })
})
