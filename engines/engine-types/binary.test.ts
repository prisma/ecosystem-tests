import { EngineType } from './constants';
import {
  getCustomBinaryPath,
  getCustomEngines,
  getCustomLibraryPath,
  runTest,
} from './utils'

describe('Binary', () => {
  beforeAll(() => {
    return getCustomEngines()
  })

  test('schema(engineType=binary)', async () => {
    const options = {
      schema: {
        engineType: EngineType.Binary,
      },
    } as const
    await runTest(options)
  })
  test('env(PRISMA_CLIENT_ENGINE_TYPE=binary)', async () => {
    const options = {
      env: {
        PRISMA_CLIENT_ENGINE_TYPE: EngineType.Binary,
      },
    } as const
    await runTest(options)
  })
  test('env(PRISMA_CLIENT_ENGINE_TYPE=binary, PRISMA_CLI_QUERY_ENGINE_TYPE=binary)', async () => {
    const options = {
      env: {
        PRISMA_CLIENT_ENGINE_TYPE: EngineType.Binary,
        PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
      },
    } as const
    await runTest(options)
  })
  test('schema(engineType=binary) env(PRISMA_QUERY_ENGINE_BINARY):  Use supplied binary', async () => {
    const options = {
      schema: {
        engineType: EngineType.Binary,
      },
      env: {
        PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
      },
    } as const
    await runTest(options)
  })

  test('schema(engineType=binary) env(PRISMA_QUERY_ENGINE_LIBRARY): uses default binary (and ignores env var)', async () => {
    const options = {
      schema: {
        engineType: EngineType.Binary,
      },
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
      },
    }
    await runTest(options)
  })
})
