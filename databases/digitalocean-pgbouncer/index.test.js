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

  })

  it('should work with default do pgbouncer without the pgbouncer query string param', async () => {
    const data = await clientWithoutQueryStringParamCall()
    expect(data).toMatchSnapshot()
  })

  it('should work with default do pgbouncer with the pgbouncer query string param', async () => {
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()
  })
})
