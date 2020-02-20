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

  // TODO: Uncommenting this makes the other test fail
  // it('should fail with docker pgbouncer without the forcedTransactions flag', async () => {
  //   expect(clientWithoutFlagCall).toThrow()
  // })

  it('should work with docker pgbouncer with the forcedTransactions flag', async () => {
    const data = await clientWithFlagCall()
    expect(data).toMatchSnapshot()
  })
})
