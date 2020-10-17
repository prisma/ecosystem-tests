const getPort = require('get-port')
const tcpProxy = require('node-tcp-proxy')
const { Client } = require('pg')
const { PrismaClient, PrismaClientValidationError, PrismaClientKnownRequestError } = require('@prisma/client')
const url = require('url');

describe('should test prisma client and postgres', () => {
  const errorLogs = []
  let client
  let prismaClient
  let hostname
  let port
  let newPort

  beforeAll(async () => {
    console.log('process.env.PG_CORE_FEATURES_AUTO_RECOVERY_DOCKER', process.env.PG_CORE_FEATURES_AUTO_RECOVERY_DOCKER)
    const { URL } = url
    const originalConnectionString =
      process.env.PG_CORE_FEATURES_AUTO_RECOVERY_DOCKER ||
      'postgres://prisma:prisma@localhost/tests'
    const proxyConnectionString = new URL(originalConnectionString)
    hostname = proxyConnectionString.hostname
    newPort = await getPort({
      port: getPort.makeRange(3100, 3200),
    })
    proxyConnectionString.port = newPort
    port = 5432
    client = new Client({
      connectionString: originalConnectionString,
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
    } catch (e) {
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

  it('should verify that the prisma client automatically recovers after an interrupted db server connection', async () => {
    const proxy = tcpProxy.createProxy(newPort, hostname, port, {})

    // confirm connection is working generally
    await prismaClient.$connect() 
    try {
      await prismaClient.user.findMany()
    } catch (e) {
      if (!(e instanceof PrismaClientValidationError)) { 
        throw new Error(`Validation error is incorrect`)
      }
      errorLogs.push(e)
    }
    expect(errorLogs.length).toBe(0)

    // reset engine and connection
    await prismaClient.$disconnect()
    await prismaClient.$connect()

    // confirm query fails when connection is taken away
    proxy.end()
    try {
      await prismaClient.user.findMany()
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) { // should throw P1001 - Can't reach database server 
        throw new Error(`Error code is incorrect`)
      }
      errorLogs.push(e)
    }
    expect(errorLogs.length).toBe(1)
    const proxy2 = tcpProxy.createProxy(newPort, hostname, port, {})
    await new Promise((r) => setTimeout(r, 16000)) 
    let users
    try {
      users = await prismaClient.user.findMany()
    } catch (e) {
      console.log(e)
      /*
      if (!(e instanceof PrismaClientValidationError)) {
        throw new Error(`Validation error is incorrect`)
      }
      */
      errorLogs.push(e)
    }
    expect(errorLogs.length).toBe(1) 
    expect(users.length).toBe(1) 
    proxy2.end()
  }, 50000)
})
