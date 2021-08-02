import execa from 'execa'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { EngineType, ENV_VARS } from './constants'

const defaultExecaOptions = {
  preferLocal: true,
  stdio: 'inherit',
  cwd: __dirname,
} as const

function buildSchemaFile(
  projectDir: string,
  options?: {
    previewFeatures?: string[]
    engineType?: EngineType
    binaryTargets?: string[]
  },
) {
  const datasource = `
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}`
  const previewFeaturesStr = options?.previewFeatures
    ? `previewFeatures = ${options.previewFeatures.map((p) => `["${p}"]`)}`
    : ''
  const clientEngineType = options?.engineType
    ? `engineType = ${options.engineType}`
    : ''
  const binaryTargetsStr = options?.binaryTargets
    ? `binaryTargets = ${options.binaryTargets.map((p) => `["${p}"]`)}`
    : ''
  const generator = `
generator client {
  provider        = "prisma-client-js"
  ${previewFeaturesStr}
  ${clientEngineType}
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
  fs.writeFileSync(path.join(projectDir, './prisma/schema.prisma'), schema, {
    encoding: 'utf-8',
  })
}

async function generate(
  projectDir: string,
  env?: Record<string, string | undefined>,
) {
  await execa('yarn', ['prisma', 'generate'], {
    ...defaultExecaOptions,
    env,
    cwd: projectDir,
  })
}

async function removePrismaCache() {
  fs.rmdirSync(path.join(os.homedir(), '.cache/prisma'), { recursive: true })
}

export async function install(
  projectPath: string,
  env?: Record<string, string | undefined>,
) {
  await execa('yarn', ['install', '--force'], {
    ...defaultExecaOptions,
    env,
    cwd: projectPath,
  })
}

export async function version(
  projectPath: string,
  env?: Record<string, string | undefined>,
) {
  const result = await execa('yarn', ['-s', 'prisma', '-v'], {
    ...defaultExecaOptions,
    stdio: 'pipe',
    env,
    cwd: projectPath,
  })
  return result.stdout
}

function snapshotDirectory(projectPath: string, dir: string, hint?: string) {
  const files = fs.readdirSync(path.join(projectPath, dir))
  const snapshotName = dir + (hint ? ' @ ' + hint : '')
  expect(files).toMatchSnapshot(snapshotName)
}

async function testGeneratedClient(
  projectDir: string,
  env?: Record<string, string | undefined>,
  expected?: { clientEngineType: EngineType },
) {
  await execa.node(path.join(projectDir, './test-generated-client.js'), [], {
    ...defaultExecaOptions,
    env,
  })
  const data = fs.readJsonSync(path.join(projectDir, './data.json'))
  // using inline snapshot here as this is identical for all tests run here
  expect(data).toMatchInlineSnapshot(`
    Object {
      "clientEngine": "${expected?.clientEngineType}",
      "delete": Object {
        "posts": Object {
          "count": 1,
        },
        "users": Object {
          "count": 1,
        },
      },
      "post.findUnique": Object {
        "id": 1,
        "title": "Test",
        "userId": 1,
      },
      "user.create": Object {
        "email": "test@example.com",
        "id": 1,
        "name": "Test",
        "posts": Array [
          Object {
            "id": 1,
            "title": "Test",
            "userId": 1,
          },
        ],
      },
      "users.findMany": Array [],
    }
  `)
}

function sanitizeVersionSnapshot(projectDir: string, str: string): string {
  let lines = str.split('\n')
  return lines
    .map((line) => {
      if (line.includes('Preview Features')) {
        return line
      }
      const test = line.split(':')
      const location = test[1].match(/\(([^)]+)\)/)
      const relativeDir = path.relative(projectDir, process.cwd()) + '/'
      return `${test[0]} : placeholder ${
        location ? location[0].replace(relativeDir, '') : ''
      }`
    })
    .join('\n')
}
interface TestContext {
  schema?: {
    previewFeatures?: string[]
    engineType?: EngineType
    binaryTargets?: string[]
  }
  env?: Record<string, string | undefined>
  env_on_deploy?: Record<string, string>
}

async function setupTmpProject(projectDir: string) {
  const wait = [
    fs.copy('./package.json', path.join(projectDir, './package.json')),
    fs.copy('./tsconfig.json', path.join(projectDir, './tsconfig.json')),
    fs.copy('./prisma/dev.db', path.join(projectDir, './prisma/dev.db')),
    fs.copy(
      './test-generated-client.js',
      path.join(projectDir, './test-generated-client.js'),
    ),
  ]
  await Promise.all(wait)
}

export async function runTest(options: TestContext) {
  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'))
  const expected = getExpectedEngines(options)
  console.log(`Project DIR: ${projectDir}`)
  await removePrismaCache()
  await setupTmpProject(projectDir)
  buildSchemaFile(projectDir, options.schema)

  // yarn install
  await install(projectDir, options.env)
  snapshotDirectory(projectDir, './node_modules/@prisma/engines')
  snapshotDirectory(projectDir, './node_modules/prisma')

  // snapshot -v output
  const versionOutput = await version(projectDir, options.env)
  expect(sanitizeVersionSnapshot(projectDir, versionOutput)).toMatchSnapshot(
    'version output @ 0 - env',
  )
  // Check CLI Engine Files
  const cliDir = path.join(projectDir, 'node_modules', 'prisma')
  const cliFiles = fs.readdirSync(cliDir)
  if (expected.cliEngineType === EngineType.Binary) {
    // Binary
    const binaryName = getOSBinaryName()
    const hasQEBinary = cliFiles.includes(binaryName)
    if (options.env && options.env[ENV_VARS.PRISMA_QUERY_ENGINE_BINARY]) {
      // If a custom path is specified for the QE then it should not be present
      expect(hasQEBinary).toBe(false)
    } else {
      // If no custom path is specified then the QE Binary should be present
      expect(hasQEBinary).toBe(true)
    }
  } else {
    // Library
    const libraryName = getOSLibraryName()
    const hasQELibrary = cliFiles.includes(libraryName)
    if (options.env && options.env[ENV_VARS.PRISMA_QUERY_ENGINE_LIBRARY]) {
      // If a custom path is specified for the QE Library then it should not be present
      expect(hasQELibrary).toBe(false)
    } else {
      // If no custom path is specified then the QE Library should be present
      expect(hasQELibrary).toBe(true)
    }
  }

  // prisma generate
  await generate(projectDir, options.env)
  snapshotDirectory(projectDir, './node_modules/.prisma/client', '0 - env')

  // Check Generated Client Engine
  const generatedClientDir = path.join(
    projectDir,
    'node_modules',
    '.prisma',
    'client',
  )
  const clientFiles = fs.readdirSync(generatedClientDir)
  if (expected.clientEngineType === EngineType.Binary) {
    // Binary
    const binaryName = getOSBinaryName()
    const hasQEBinary = clientFiles.includes(binaryName)
    expect(hasQEBinary).toBe(true)
  } else {
    // Library
    const libraryName = getOSLibraryName()
    const hasQELibrary = clientFiles.includes(libraryName)
    expect(hasQELibrary).toBe(true)
  }

  // Overwrite env to simulate deployment with different settings
  if (options.env_on_deploy) {
    options.env = options.env_on_deploy
  }

  await testGeneratedClient(projectDir, options.env, expected)

  // Additional snapshots if env changed after generate
  if (options.env_on_deploy) {
    snapshotDirectory(
      projectDir,
      './node_modules/.prisma/client',
      '1 - after_env_change',
    )
    const versionOutput2 = await version(projectDir, options.env)
    expect(sanitizeVersionSnapshot(projectDir, versionOutput2)).toMatchSnapshot(
      'version output @ 1 - after_env_change',
    )
  }
}
export function getOSBinaryName() {
  return os.type() == 'Windows_NT'
    ? 'query-engine-windows.exe'
    : os.type() == 'Darwin'
    ? 'query-engine-darwin'
    : 'query-engine-debian-openssl-1.1.x'
}

export function getOSLibraryName() {
  return os.type() == 'Windows_NT'
    ? 'query_engine-windows.dll.node'
    : os.type() == 'Darwin'
    ? 'libquery_engine-darwin.dylib.node'
    : 'libquery_engine-debian-openssl-1.1.x.so.node'
}
export function getCustomBinaryPath() {
  // Using absolute path because of https://github.com/prisma/prisma/issues/7779
  let engine = path.resolve(
    '.',
    'custom-engines',
    'binary',
    os.type(),
    getOSBinaryName(),
  )
  console.log('binary', { engine })
  return engine
}

export function getCustomLibraryPath() {
  // Using absolute path because of https://github.com/prisma/prisma/issues/7779
  let engine = path.resolve(
    '.',
    'custom-engines',
    'library',
    os.type(),
    getOSLibraryName(),
  )
  console.log('library', { engine })
  return engine
}

export async function getCustomEngines() {
  // console.log('getCustomeEngines start')
  const binaryFolder = './custom-engines/binary/' + os.type()
  const binary_keep = binaryFolder + '/.keep'
  if (fs.existsSync(binary_keep)) {
    fs.unlinkSync(binary_keep)
    const env = {
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
    }
    await install(process.cwd(), env)
    await version(process.cwd(), env)
    fs.copySync('./node_modules/@prisma/engines', binaryFolder)
  }

  fs.rmdirSync('./node_modules/@prisma/engines', { recursive: true })

  const libraryFolder = './custom-engines/library/' + os.type()
  const library_keep = libraryFolder + '/.keep'
  if (fs.existsSync(library_keep)) {
    fs.unlinkSync(library_keep)
    const env = {
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.NodeAPI,
    }

    await install(process.cwd(), env)
    await version(process.cwd(), env)
    fs.copySync('./node_modules/@prisma/engines', libraryFolder)
  }
  // console.log('getCustomeEngines end')

  // console.log('binaryFolder:')
  // fs.readdirSync(binaryFolder).forEach((file: any) => {
  //   console.log(file)
  // })

  // console.log('libraryFolder:')
  // fs.readdirSync(libraryFolder).forEach((file: any) => {
  //   console.log(file)
  // })
}
export function getExpectedEngines(options: TestContext) {
  return {
    clientEngineType: getExpectedClientEngine(
      options.schema?.engineType,
      options?.env?.[ENV_VARS.PRISMA_CLIENT_ENGINE_TYPE] as undefined | EngineType
    ),
    cliEngineType: getExpectedCLIEngine(options?.env?.[ENV_VARS.PRISMA_CLI_QUERY_ENGINE_TYPE] as undefined | EngineType),
  }
}
export function getExpectedClientEngine(
  engineType: EngineType | undefined,
  envOverride: EngineType | undefined,
) {
  const DEFAULT_CLIENT_ENGINE_TYPE = EngineType.NodeAPI
  if (envOverride) {
    return envOverride
  }
  if (engineType) {
    return engineType
  }

  return DEFAULT_CLIENT_ENGINE_TYPE
}
export function getExpectedCLIEngine(envOverride: EngineType | undefined) {
  const DEFAULT_CLI_QUERY_ENGINE_TYPE = EngineType.NodeAPI
  if (envOverride) {
    return envOverride
  }
  return DEFAULT_CLI_QUERY_ENGINE_TYPE
}
