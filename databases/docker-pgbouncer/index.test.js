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
  // it('should fail with docker pgbouncer without the pgbouncer query string param', async () => {
  //   expect(clientWithoutQueryStringParamCall).toThrow()
  // })

  it('should work with docker pgbouncer with the pgbouncer query string param', async () => {
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()
  })
})
