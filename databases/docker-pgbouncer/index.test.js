const {
  client1WithoutQueryStringParamCall,
  client2WithoutQueryStringParamCall,
  client1WithQueryStringParamCall,
  client2WithQueryStringParamCall,
  client1WithoutQueryStringParam,
  client2WithoutQueryStringParam,
  pgBouncerMetaClient,
  client1WithQueryStringParam,
  client2WithQueryStringParam,
} = require('.')

describe('should test Prisma client and PgBouncer', () => {
  beforeAll(async () => {
    await pgBouncerMetaClient.connect()
  })

  afterAll(async () => {
    await client1WithoutQueryStringParam.$disconnect()
    await client2WithoutQueryStringParam.$disconnect()
    await client1WithQueryStringParam.$disconnect()
    await client2WithQueryStringParam.$disconnect()
    await pgBouncerMetaClient.end()
    return
  })

  it('should fail with docker pgbouncer without the pgbouncer query string param', async () => {
    let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
    console.log(query0.rows)

    try {
      let query1 = await client1WithoutQueryStringParamCall()
      console.log({ query1 })

      /*
       * Query engines instances name prepared statements serially s0, s1 and so on. Without the `pgbouncer=true` flag,
       * prepared statements are not cleaned up in PgBouncer. By using different Clients, we expect the both instances to use s0
       * The conflicting client call should throw "prepared statement s0 already exists"
       */
      let query2 = await client2WithoutQueryStringParamCall()
      console.log({ query2 })

      expect(1).toEqual(0) // The code should never reach here
    } catch (e) {
      expect(e.toString()).toMatchSnapshot()
    }
  })

  it('should work with docker pgbouncer with the pgbouncer query string param', async () => {
    let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
    console.log(query0.rows)

    const data = await client1WithQueryStringParamCall()
    expect(data).toMatchSnapshot()

    const data1 = await client2WithQueryStringParamCall()
    expect(data1).toMatchSnapshot()
  })
})
