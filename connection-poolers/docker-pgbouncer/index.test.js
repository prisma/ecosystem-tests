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
  postgresMetaClient,
} = require('.')

describe('should test Prisma client and Docker PgBouncer', () => {
  beforeAll(async () => {
    await pgBouncerMetaClient.connect()
    await postgresMetaClient.connect()
  })

  afterAll(async () => {
    await client1WithoutQueryStringParam.$disconnect()
    await client2WithoutQueryStringParam.$disconnect()
    await client1WithQueryStringParam.$disconnect()
    await client2WithQueryStringParam.$disconnect()
    await pgBouncerMetaClient.end()
    await postgresMetaClient.end()
    return
  })

  describe('when 2 clients send a query', () => {
    it('should fail / without the pgbouncer query string param', async () => {
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
        expect(e.toString()).toMatchInlineSnapshot(`
"PrismaClientUnknownRequestError: 
Invalid \`client2WithoutQueryStringParam.user.findMany()\` invocation in
/workspace/ecosystem-tests/connection-poolers/docker-pgbouncer/index.js:52:58

  49   return data
  50 }
  51 async function client2WithoutQueryStringParamCall() {
→ 52   const data = await client2WithoutQueryStringParam.user.findMany(
Error occurred during query execution:
ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(PostgresError { code: \\"42P05\\", message: \\"prepared statement \\\\\\"s0\\\\\\" already exists\\", severity: \\"ERROR\\", detail: None, column: None, hint: None }), transient: false })"
`)
      }
    })

    it('should work / with the pgbouncer query string param', async () => {
      let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
      console.log(query0.rows)

      const data = await client1WithQueryStringParamCall()
      expect(data).toMatchInlineSnapshot(`Array []`)

      const data1 = await client2WithQueryStringParamCall()
      expect(data1).toMatchInlineSnapshot(`Array []`)
    })
  })

  describe('when 1 client sends 2 queries, but the connection is replaced in between', () => {


    it('should fail / without the pgbouncer query string param / ', async () => {
      let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
      console.log(query0.rows)

      try {
        let query1 = await client1WithoutQueryStringParamCall()
        console.log({ query1 })

        // kill all open connections of postgres (except this one)
        let query_kill = await postgresMetaClient.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid();`)
        console.log(query_kill.rows)

        let query2 = await client1WithoutQueryStringParamCall()
        console.log({ query2 })

        expect(1).toEqual(0) // The code should never reach here
      } catch (e) {
        expect(e.toString()).toMatchInlineSnapshot(`
"PrismaClientUnknownRequestError: 
Invalid \`client1WithoutQueryStringParam.user.findMany()\` invocation in
/workspace/ecosystem-tests/connection-poolers/docker-pgbouncer/index.js:48:58

  45 })
  46 
  47 async function client1WithoutQueryStringParamCall() {
→ 48   const data = await client1WithoutQueryStringParam.user.findMany(
Error occurred during query execution:
ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(PostgresError { code: \\"26000\\", message: \\"prepared statement \\\\\\"s0\\\\\\" does not exist\\", severity: \\"ERROR\\", detail: None, column: None, hint: None }), transient: false })"
`)
      }
    })

    it('should work / with the pgbouncer query string param', async () => {
      let query0 = await pgBouncerMetaClient.query('SHOW VERSION')
      console.log(query0.rows)

      let query1 = await client1WithQueryStringParamCall()
      console.log({ query1 })
      expect(query1).toMatchInlineSnapshot(`Array []`)

      // kill all open connections of postgres (except this one)
      let query_kill = await postgresMetaClient.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid();`)
      console.log(query_kill.rows)

      let query2 = await client1WithQueryStringParamCall()
      console.log({ query2 })
      expect(query2).toMatchInlineSnapshot(`Array []`)
    })
  })
})
