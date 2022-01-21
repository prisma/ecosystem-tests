import execa from 'execa'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import {
  DEFAULT_CLIENT_ENGINE_TYPE,
  DEFAULT_CLI_QUERY_ENGINE_TYPE,
  EngineType,
  Expected,
  TestOptions,
} from './constants'

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
    ? `engineType = "${options.engineType}"`
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
function generateTestName(options: TestOptions, expected: Expected) {
  const expectedStr = `expected(CLI=${expected.cliEngineType}, CLIENT=${expected.clientEngineType})`
  const envOverridesStr = options?.env
    ? `env(PRISMA_CLIENT_ENGINE_TYPE=${
        options?.env?.PRISMA_CLIENT_ENGINE_TYPE
      }, PRISMA_CLI_QUERY_ENGINE_TYPE=${
        options?.env?.PRISMA_CLI_QUERY_ENGINE_TYPE
      } ${
        options?.env?.PRISMA_QUERY_ENGINE_LIBRARY
          ? 'PRISMA_QUERY_ENGINE_LIBRARY '
          : ''
      }${
        options?.env?.PRISMA_QUERY_ENGINE_BINARY
          ? 'PRISMA_QUERY_ENGINE_BINARY'
          : ''
      })`
    : ''
  const schemaStr = options?.schema
    ? ` schema(${
        options?.schema?.engineType
          ? `engineType=${options?.schema?.engineType} `
          : ''
      }${
        options?.schema?.previewFeatures
          ? `previewFeatures=[${options?.schema?.previewFeatures.join(',')}]`
          : ''
      })`
    : ``
  return [expectedStr, envOverridesStr, schemaStr].join(' ')
}

/**
 * Checks the version output for the correct engine and if `PRISMA_QUERY_ENGINE_BINARY` or `PRISMA_QUERY_ENGINE_LIBRARY`
 * are correctly used
 */
async function checkVersionOutput(
  projectDir: string,
  options: TestOptions,
  expected: Expected,
) {
  const expectedQueryEngineRE =
    expected.cliEngineType === EngineType.Binary
      ? new RegExp(/Query Engine \(Binary\)/)
      : new RegExp(/Query Engine \(Node-API\)/)

  const versionOutput = await version(projectDir, options.env)
  const hasCorrectEngine = expectedQueryEngineRE.test(versionOutput)
  expect(hasCorrectEngine).toBe(true)
  if (
    options.env?.PRISMA_QUERY_ENGINE_BINARY &&
    expected.cliEngineType === EngineType.Binary
  ) {
    expect(versionOutput).toContain('resolved by PRISMA_QUERY_ENGINE_BINARY')
  }
  if (
    options.env?.PRISMA_QUERY_ENGINE_LIBRARY &&
    expected.cliEngineType === EngineType.Library
  ) {
    expect(versionOutput).toContain('resolved by PRISMA_QUERY_ENGINE_LIBRARY')
  }
}

function checkCLIForExpectedEngine(
  projectDir: string,
  options: TestOptions,
  expected: Expected,
) {
  const cliDir = path.join(projectDir, 'node_modules', 'prisma')
  const cliFiles = fs.readdirSync(cliDir)
  if (expected.cliEngineType === EngineType.Binary) {
    // Binary
    const binaryName = getOSBinaryName()
    const hasQEBinary = cliFiles.includes(binaryName)
    if (options.env && options.env?.PRISMA_QUERY_ENGINE_BINARY) {
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
    if (options.env && options.env?.PRISMA_QUERY_ENGINE_LIBRARY) {
      // If a custom path is specified for the QE Library then it should not be present
      expect(hasQELibrary).toBe(false)
    } else {
      // If no custom path is specified then the QE Library should be present
      expect(hasQELibrary).toBe(true)
    }
  }
}

function checkClientForExpectedEngine(
  projectDir: string,
  options: TestOptions,
  expected: Expected,
) {
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
}
/**
 * Generates and tests if the correct engines are used. {@link getExpectedEngineTypes } is used to determine what engine is expected for the `cli` and the `client`
 */
export async function runTest(options: TestOptions) {
  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'))
  const expected = getExpectedEngineTypes(options)
  const testName = generateTestName(options, expected)
  return test(testName, async () => {
    console.log(`Project DIR: ${projectDir}`)
    // await removePrismaCache()
    await setupTmpProject(projectDir)
    buildSchemaFile(projectDir, options.schema)

    // yarn install
    await install(projectDir, options.env)
    // snapshotDirectory(projectDir, './node_modules/@prisma/engines')
    // snapshotDirectory(projectDir, './node_modules/prisma')

    await checkVersionOutput(projectDir, options, expected)

    // Check CLI Engine Files
    // expect(sanitizeVersionSnapshot(projectDir, versionOutput)).toMatchSnapshot(
    //   'version output @ 0 - env',
    // )
    checkCLIForExpectedEngine(projectDir, options, expected)

    // prisma generate
    await generate(projectDir, options.env)
    // snapshotDirectory(projectDir, './node_modules/.prisma/client', '0 - env')

    // Check Generated Client Engine
    checkClientForExpectedEngine(projectDir, options, expected)

    // Overwrite env to simulate deployment with different settings
    if (options.env_on_deploy) {
      options.env = options.env_on_deploy
    }

    await testGeneratedClient(projectDir, options.env, expected)

    // Additional snapshots if env changed after generate
    if (options.env_on_deploy) {
      const expectedPostDeploy = getExpectedEngineTypes(options)
      await checkVersionOutput(projectDir, options, expectedPostDeploy)
    }
  }, 300_000)
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
  const binaryFolder = './custom-engines/binary/' + os.type()
  if (!fs.existsSync(binaryFolder)) {
    fs.mkdirpSync(binaryFolder)
    const env = {
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
    }
    await install(process.cwd(), env)
    await version(process.cwd(), env)
    fs.copySync('./node_modules/@prisma/engines', binaryFolder)
    fs.rmdirSync('./node_modules/@prisma/engines', { recursive: true })
  }
  const libraryFolder = './custom-engines/library/' + os.type()
  if (!fs.existsSync(libraryFolder)) {
    const env = {
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Library,
    }

    await install(process.cwd(), env)
    await version(process.cwd(), env)
    fs.copySync('./node_modules/@prisma/engines', libraryFolder, {})
  }
}
export function getExpectedEngineTypes(options: TestOptions): Expected {
  return {
    clientEngineType: getExpectedClientEngineType(options),
    cliEngineType: getExpectedCLIEngineType(options),
  }
}
export function getExpectedClientEngineType(options: TestOptions) {
  if (options?.env?.PRISMA_CLIENT_ENGINE_TYPE) {
    return options?.env?.PRISMA_CLIENT_ENGINE_TYPE
  }
  if (options.schema?.engineType) {
    return options.schema?.engineType
  }
  if (
    options.schema?.previewFeatures &&
    options.schema?.previewFeatures.includes('nApi')
  ) {
    return EngineType.Library
  }

  return DEFAULT_CLIENT_ENGINE_TYPE
}
export function getExpectedCLIEngineType(options: TestOptions) {
  if (options?.env?.PRISMA_CLI_QUERY_ENGINE_TYPE) {
    return options?.env?.PRISMA_CLI_QUERY_ENGINE_TYPE
  }
  return DEFAULT_CLI_QUERY_ENGINE_TYPE
}
