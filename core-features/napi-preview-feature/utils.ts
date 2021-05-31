import execa from 'execa'
import fs from 'fs'
function buildSchema(previewFeatures?: string[]) {
  const datasource = `
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}`
  const previewFeaturesStr = previewFeatures
    ? `previewFeatures = ${previewFeatures.map((p) => `["${p}"]`)}`
    : ''

  const generator = `
generator client {
  provider        = "prisma-client-js"
  binaryTargets = ["native"]
  ${previewFeaturesStr}
}`

  const models = `
model User {
  id    Int    @id
  name  String
  email String
  posts Post[]
}

model Post {
  id     Int @id
  title  String
  User   User   @relation(fields: [userId], references: [id])
  userId Int
}`
  const schema = `${datasource}${generator}${models}`
  fs.writeFileSync('./prisma/schema.prisma', schema, {
    encoding: 'utf-8',
  })
}

async function generate(env?: Record<string, string>) {
  await execa('prisma', ['generate'], {
    env,
    preferLocal: true,
    stdio: 'inherit',
  })
}

async function clean() {
  fs.rmdirSync('./node_modules/prisma', { recursive: true })
  fs.rmdirSync('./node_modules/@prisma', { recursive: true })
  fs.rmdirSync('./node_modules/.prisma', { recursive: true })
  if (fs.existsSync('./prisma/schema.prisma')) {
    fs.unlinkSync('./prisma/schema.prisma')
  }
}

async function install(env?: Record<string, string>) {
  await execa('yarn', ['install', '--force'], {
    env,
    preferLocal: true,
    stdio: 'inherit',
  })
}
function snapshotDirectory(pth: string) {
  const files = fs.readdirSync(pth)
  expect(files).toMatchSnapshot(pth)
}
async function testGeneratedClient() {}
export async function runTest(options: {
  previewFeatures?: string[]
  env?: Record<string, string>
}) {
  await clean()
  buildSchema(options.previewFeatures)
  await install(options.env)
  snapshotDirectory('./node_modules/@prisma/engines')
  snapshotDirectory('./node_modules/prisma')

  await generate(options.env)
  // await new Promise((r) => setTimeout(r, 100))

  snapshotDirectory('./node_modules/.prisma/client')
  await testGeneratedClient()
}
