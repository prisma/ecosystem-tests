const {
  clientWithoutQueryStringParamCall,
  clientWithQueryStringParamCall,
  client,
  pgBouncerMetaClient,
  clientWithQueryStringParam,
} = require('.')

describe('should test Prisma client and PgBouncer', () => {
  afterAll(async () => {
    await client.$disconnect()
    await clientWithQueryStringParam.$disconnect()
    return
  })

  it('should fail with docker pgbouncer without the pgbouncer query string param', async () => {
    await pgBouncerMetaClient.connect()
    let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
    console.log({ query0 })
    pgBouncerMetaClient.end()
    
    try {
      

      let query1 = await clientWithoutQueryStringParamCall()
      console.log({ query1 })

      /*
       * Query engine instance names prepared statements serially s0, s1 and so on. Without the `pgbouncer=true` flag,
       * prepared statements are not cleaned up in PgBouncer. By doing disconnect/reconnect, we get a
       * new instance of query engine that starts again at s0. And we expect the next client call to throw
       * "prepared statement s0 already exists"
       */
      await client.$disconnect()
      await client.$connect()

      let query2 = await clientWithoutQueryStringParamCall()
      console.log({ query2 })

      expect(1).toEqual(0) // The code should never reach here
    } catch (e) {
      expect(e.toString()).toMatchSnapshot()
    }
  })

  it('should work with docker pgbouncer with the pgbouncer query string param', async () => {
    await pgBouncerMetaClient.connect()
    let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
    console.log({ query0 })
    pgBouncerMetaClient.end()
    
    const data = await clientWithQueryStringParamCall()
    expect(data).toMatchSnapshot()

    await clientWithQueryStringParam.$disconnect()
    await clientWithQueryStringParam.$connect()

    const data1 = await clientWithQueryStringParamCall()
    expect(data1).toMatchSnapshot()
  })
})
