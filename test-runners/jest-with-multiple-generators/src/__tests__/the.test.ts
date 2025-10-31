import { Prisma as PA, PrismaClient as PCA } from '../../generated/database/client'
import { Prisma as PB, PrismaClient as PCB } from '../../generated/database/client2'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/keep.db',
})

const prismaA = new PCA({ adapter })
const prismaB = new PCB({ adapter })

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
[
  "client.d.ts",
  "client.js",
  "default.d.ts",
  "default.js",
  "edge.d.ts",
  "edge.js",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "package.json",
  "query-engine-debian-openssl-1.1.x",
  "query_compiler_bg.wasm",
  "query_compiler_bg.wasm",
  "runtime",
  "schema.prisma",
  "wasm-edge-light-loader.mjs",
  "wasm-worker-loader.mjs",
  "wasm.d.ts",
  "wasm.js",
]
`)
      expect(filesB).toMatchInlineSnapshot(`
[
  "client.d.ts",
  "client.js",
  "default.d.ts",
  "default.js",
  "edge.d.ts",
  "edge.js",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "package.json",
  "query-engine-debian-openssl-1.1.x",
  "query_compiler_bg.wasm",
  "query_compiler_bg.wasm",
  "runtime",
  "schema.prisma",
  "wasm-edge-light-loader.mjs",
  "wasm-worker-loader.mjs",
  "wasm.d.ts",
  "wasm.js",
]
`)
    } else {
      expect(filesA).toMatchInlineSnapshot(`
[
  "client.d.ts",
  "client.js",
  "default.d.ts",
  "default.js",
  "edge.d.ts",
  "edge.js",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "libquery_engine-debian-openssl-1.1.x.so.node",
  "package.json",
  "query_compiler_bg.wasm",
  "query_compiler_bg.wasm",
  "runtime",
  "schema.prisma",
  "wasm-edge-light-loader.mjs",
  "wasm-worker-loader.mjs",
  "wasm.d.ts",
  "wasm.js",
]
`)
      expect(filesB).toMatchInlineSnapshot(`
[
  "client.d.ts",
  "client.js",
  "default.d.ts",
  "default.js",
  "edge.d.ts",
  "edge.js",
  "index-browser.js",
  "index.d.ts",
  "index.js",
  "libquery_engine-debian-openssl-1.1.x.so.node",
  "package.json",
  "query_compiler_bg.wasm",
  "query_compiler_bg.wasm",
  "runtime",
  "schema.prisma",
  "wasm-edge-light-loader.mjs",
  "wasm-worker-loader.mjs",
  "wasm.d.ts",
  "wasm.js",
]
`)
    }
  })
})
