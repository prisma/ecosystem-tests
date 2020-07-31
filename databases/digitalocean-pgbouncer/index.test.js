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
    // TODO: This is expected to throw but it doesn't
    const data = await clientWithoutQueryStringParamCall()
    expect(data).toMatchSnapshot()

    const data1 = await clientWithoutQueryStringParamCall()
    expect(data1).toMatchSnapshot()
  })

  it('should work with default do pgbouncer with the pgbouncer query string param', async () => {
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()

    const data1 = await clientWithQueryStringParamCall()
    expect(data1).toMatchSnapshot()
  })
})
