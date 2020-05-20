const {
  clientWithoutQueryStringParamCall,
  clientWithQueryStringParamCall,
  client,
  clientWithQueryStringParam,
} = require('.')

describe('should test Prisma client and PgBouncer', () => {
  afterAll(async () => {
    await client.disconnect()
    await clientWithQueryStringParam.disconnect()
    return
  })

  // TODO: Uncommenting this makes the other test fail
  // it('should fail with docker pgbouncer without the forcedTransactions flag', async () => {
  //   expect(clientWithoutQueryStringParamCall).toThrow()
  // })

  it('should work with docker pgbouncer with the forcedTransactions flag', async () => {
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()
  })
})
