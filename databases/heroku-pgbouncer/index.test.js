const {
  clientWithoutQueryStringParamCall,
  clientWithQueryStringParamCall,
  client,
  clientWithQueryStringParam,
} = require('.')

describe('should test Prisma client and PgBouncer', () => {
  afterAll(async () => {
    await client.$disconnect()
    await clientWithQueryStringParam.$disconnect()
    return
  })

  it.skip('should fail with default heroku pgbouncer without the pgbouncer query string param', async () => {
    try {
      await clientWithoutQueryStringParamCall()

      /*
       * Query engine instance names prepared statements serially s0, s1 and so on. Without the `pgbouncer=true` flag,
       * prepared statements are not cleaned up in PgBouncer. By doing disconnect/reconnect, we get a
       * new instance of query engine that starts again at s0. And we expect the next client call to throw
       * "prepared statement s0 already exists"
       */
      await client.$disconnect()
      await client.$connect()

      await clientWithoutQueryStringParamCall()
      expect(1).toEqual(0) // The code should never reach here
    } catch (e) {
      expect(e).toMatchSnapshot()
    }
  })

  it('should work with default heroku pgbouncer with the pgbouncer query string param', async () => {
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()

    const data1 = await clientWithQueryStringParamCall()
    expect(data1).toMatchSnapshot()
  })
})
