const assert = require('assert')
const getPort =  require('get-port')
const tcpProxy = require('node-tcp-proxy')
const { Client } = require('pg')
const { PrismaClient, PrismaClientValidationError } = require('@prisma/client')

describe('Prisma client and postgres works with a proxy and flakyness', () => {
  let requests = []
  let errorLogs = []
  let client
  let prismaClient
  let hostname
  let port
  let newPort

  beforeAll(async () => {
    const originalConnectionString = process.env.OS_BASE_PG_URL_ISOLATED || "postgres://prisma:prisma@localhost/tests"
    
    let proxyConnectionString = new URL(originalConnectionString)
    hostname = proxyConnectionString.hostname 
    port = proxyConnectionString.port
    newPort = await getPort({
        port: getPort.makeRange(3100,3200),
    })
    proxyConnectionString.port = newPort

    client = new Client({
      connectionString: originalConnectionString
    })
    try {
      await client.connect()
      await client.query(`
      DROP TYPE IF EXISTS "Role";
      CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
      DROP TABLE IF EXISTS "public"."Post" CASCADE;
      CREATE TABLE "public"."Post" (
          "id" text NOT NULL,
          "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00'::timestamp without time zone,
          "published" boolean NOT NULL DEFAULT false,
          "title" text NOT NULL,
          "content" text,
          "authorId" text,
          "jsonData" jsonb,
          PRIMARY KEY ("id")
      );
      DROP TABLE IF EXISTS "public"."User" CASCADE;
      CREATE TABLE "public"."User" (
          "id" text,
          "email" text NOT NULL,
          "name" text,
          PRIMARY KEY ("id")
      );
      CREATE UNIQUE INDEX "User.email" ON "public"."User"("email");
      ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId") REFERENCES "public"."User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
      INSERT INTO "public"."User" (email, id, name) VALUES ('a@a.de',	'576eddf9-2434-421f-9a86-58bede16fd95',	'Alice');
    `)

     prismaClient = new PrismaClient({
      errorFormat: 'colorless',
      __internal: {
        measurePerformance: true,
        hooks: {
          beforeRequest: (request) => requests.push(request),
        },
      },
      datasources: {
        db: {
          url: proxyConnectionString.href,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'error',
        },
      ],
    })
    } catch(e) {
      console.log(e)
    }
  })

  afterAll(async () => {
    await prismaClient.$disconnect()
    await client.query(`
    DROP TABLE IF EXISTS "public"."Post" CASCADE;
    DROP TABLE IF EXISTS "public"."User" CASCADE;`)
    await client.end()
  })

  it('should verify that requests are not made after prisma client has disconnected', async () => {
    const proxy = tcpProxy.createProxy(newPort, hostname, port, {})

    expect(prismaClient.internalDatasources).toBe(undefined)
    await prismaClient.user.findMany()

    prismaClient.$disconnect()
    expect(requests.length).toBe(1)
    await prismaClient.user.findMany()
    prismaClient.$disconnect()

    await new Promise((r) => setTimeout(r, 200))
    assert.strictEqual(requests.length, 2)

    const count = await prismaClient.user.count()
    assert.ok(typeof count === 'number')

    prismaClient.$connect()
    await prismaClient.$disconnect()

    await new Promise((r) => setTimeout(r, 200))
    prismaClient.$connect()

    const userPromise = prismaClient.user.findMany()
    await userPromise

    await prismaClient.$disconnect()
    await prismaClient.$connect()

    proxy.end()
}, 50000);

it('should verify that prisma client can make various queries with a proxy', async () => {
  try {
    const users = await prismaClient.user.findMany()
    } catch (e) {}
    const proxy2 = tcpProxy.createProxy(newPort, hostname, port, {})

    let validationError
    try {
      await prismaClient.post.create({
        data: {},
      })
    } catch (e) {
      validationError = e
    } finally {
      if (
        !validationError ||
        !(validationError instanceof PrismaClientValidationError)
      ) {
        throw new Error(`Validation error is incorrect`)
      }
      errorLogs.push(validationError)
    }

    await new Promise((r) => setTimeout(r, 16000))
    assert.strictEqual(errorLogs.length, 1)
    try {
      const users = await prismaClient.user.findMany()
    } catch (e) {}
    const users = await prismaClient.user.findMany()
    assert.strictEqual(users.length, 1)

    proxy2.end()
  }, 50000)
})

