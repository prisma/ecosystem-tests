import { Prisma as PA, PrismaClient as PCA } from '../../generated/database/client'
import { Prisma as PB, PrismaClient as PCB } from '../../generated/database/client2'

const prismaA = new PCA()
const prismaB = new PCB()

afterAll(async () => {
  await prismaA.$disconnect()
  await prismaB.$disconnect()
})

describe('Prisma in jest with multiple generators', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })

  it('should return Prisma version', () => {
    const pjson = require('../../package.json')
    expect(PA.prismaVersion.client).toBe(pjson.dependencies['@prisma/client'])
    expect(PB.prismaVersion.client).toBe(pjson.dependencies['@prisma/client'])
  })

  it('should be able to query the database', async () => {
    const data = await prismaA.user.findMany()
    expect(data).toMatchObject([])
    const dataB = await prismaB.user.findMany()
    expect(dataB).toMatchObject([])
  })

  it('should use the correct engine files', async () => {
    const fs = require('fs')
    const path = require('path')
    const filesA = fs.readdirSync(path.dirname(require.resolve('../../generated/database/client')))
    const filesB = fs.readdirSync(path.dirname(require.resolve('../../generated/database/client2')))
    if (process.env.PRISMA_CLIENT_ENGINE_TYPE === 'binary') {
      expect(filesA).toMatchInlineSnapshot(`
Array [
  "edge",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "package.json",
  "query-engine-debian-openssl-1.1.x",
  "runtime",
  "schema.prisma",
]
`)
      expect(filesB).toMatchInlineSnapshot(`
Array [
  "edge",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "package.json",
  "query-engine-debian-openssl-1.1.x",
  "runtime",
  "schema.prisma",
]
`)
    } else {
      expect(filesA).toMatchInlineSnapshot(`
Array [
  "edge",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "libquery_engine-debian-openssl-1.1.x.so.node",
  "package.json",
  "runtime",
  "schema.prisma",
]
`)
      expect(filesB).toMatchInlineSnapshot(`
Array [
  "edge",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "libquery_engine-debian-openssl-1.1.x.so.node",
  "package.json",
  "runtime",
  "schema.prisma",
]
`)
    }
  })
})
