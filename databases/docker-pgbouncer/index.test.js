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

  it('should fail with docker pgbouncer without the pgbouncer query string param', async () => {
    try {
      const _ = await clientWithoutQueryStringParamCall()
    } catch (e) {
      expect(e.toString()).toMatchSnapshot()
    }
  })

  it('should work with docker pgbouncer with the pgbouncer query string param', async () => {
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()

    const data1 = await clientWithQueryStringParamCall()
    expect(data1).toMatchSnapshot()
  })
})
