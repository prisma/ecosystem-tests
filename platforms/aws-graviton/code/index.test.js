const { PrismaClient, Prisma } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: './keep.db' }),
})

describe('Prisma', () => {
  afterAll(() => {
    prisma.$disconnect()
  })

  it('should return Prisma version', () => {
    const pjson = require('./package.json')
    expect(Prisma.prismaVersion.client).toBe(pjson.dependencies['@prisma/client'])
  })

  it('should be able to query the database', async () => {
    const data = await prisma.user.findMany()
    expect(data).toMatchObject([])
  })

  it('should use the correct engine files', async () => {
    const fs = require('fs')
    const path = require('path')
    const generatedClientDir = path.dirname(
      require.resolve('.prisma/client', {
        paths: [path.dirname(require.resolve('@prisma/client'))],
      }),
    )
    const files = fs.readdirSync(generatedClientDir)

    expect(files).toMatchInlineSnapshot(`
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
  "query_compiler_bg.js",
  "query_compiler_bg.wasm",
  "query_compiler_bg.wasm-base64.js",
  "schema.prisma",
  "wasm-edge-light-loader.mjs",
  "wasm-worker-loader.mjs",
]
`)
  })
})
