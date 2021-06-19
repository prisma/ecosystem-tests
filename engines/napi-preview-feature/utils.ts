import execa from 'execa'
import fs from 'fs'

const defaultExecaOptions = {
  preferLocal: true,
  stdio: 'inherit',
  cwd: __dirname,
} as const
function buildSchema(options?: {
  previewFeatures?: string[]
  binaryTargets?: string[]
}) {
  const datasource = `
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}`
  const previewFeaturesStr = options?.previewFeatures
    ? `previewFeatures = ${options.previewFeatures.map((p) => `["${p}"]`)}`
    : ''
  const binaryTargetsStr = options?.binaryTargets
    ? `binaryTargets = ${options.binaryTargets.map((p) => `["${p}"]`)}`
    : ''
  const generator = `
generator client {
  provider        = "prisma-client-js"
  ${previewFeaturesStr}
  ${binaryTargetsStr}
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
  const files = fs.readdirSync('./')
  fs.writeFileSync('./prisma/schema.prisma', schema, {
    encoding: 'utf-8',
  })
}

async function generate(env?: Record<string, string>) {
  await execa('yarn', ['prisma', 'generate'], {
    ...defaultExecaOptions,
    env,
  })
}

async function clean() {
  fs.rmdirSync('./node_modules/prisma', { recursive: true })
  fs.rmdirSync('./node_modules/@prisma', { recursive: true })
  fs.rmdirSync('./node_modules/.prisma', { recursive: true })
  if (fs.existsSync('./prisma/schema.prisma')) {
    fs.unlinkSync('./prisma/schema.prisma')
  }
  if (fs.existsSync('./data.json')) {
    fs.unlinkSync('./data.json')
  }
}

async function install(env?: Record<string, string>) {
  await execa('yarn', ['install', '--force'], {
    ...defaultExecaOptions,
    env,
  })
}

async function version(env?: Record<string, string>) {
  const result = await execa('yarn', ['-s', 'prisma', '-v'], {
    ...defaultExecaOptions,
    stdio: 'pipe',
    env,
  })
  return result.stdout
}

function snapshotDirectory(pth: string) {
  const files = fs.readdirSync(pth)
  expect(files).toMatchSnapshot(pth)
}

async function testGeneratedClient(env?: Record<string, string>) {
  await execa.node('./test-generated-client.js', [], {
    ...defaultExecaOptions,
    env,
  })
  const data = require('./data.json')
  expect(data).toMatchSnapshot()
}

function cleanVersionSnapshot(str: string): string {
  let lines = str.split('\n')
  return lines
    .map((line) => {
      const test = line.split(':')
      const location = test[1].match(/\(([^)]+)\)/)
      return `${test[0]} : placeholder ${location ? location[0] : ''}`
    })
    .join('\n')
}

export async function runTest(options: {
  previewFeatures?: string[]
  binaryTargets?: string[]
  env?: Record<string, string>
}) {
  // This ensures that if PRISMA_FORCE_NAPI is set for the workflow it is removed before running these tests
  if (process.env.PRISMA_FORCE_NAPI === 'true') {
    delete process.env.PRISMA_FORCE_NAPI
  }
  await clean()
  buildSchema({
    previewFeatures: options.previewFeatures,
    binaryTargets: options.binaryTargets,
  })

  // yarn install
  await install(options.env)
  snapshotDirectory('./node_modules/@prisma/engines')
  snapshotDirectory('./node_modules/prisma')

  // prisma generate
  await generate(options.env)

  snapshotDirectory('./node_modules/.prisma/client')
  await testGeneratedClient(options.env)
  const versionOutput = await version(options.env)
  expect(cleanVersionSnapshot(versionOutput)).toMatchSnapshot()
}
