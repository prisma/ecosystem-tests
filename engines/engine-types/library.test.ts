import { EngineType } from './constants';
import {
  getCustomBinaryPath,
  getCustomEngines,
  getCustomLibraryPath,
  runTest,
} from './utils'

// TODO set cutom binary (!) path and see if it is ignored
describe('Library', () => {
  beforeAll(() => {
    return getCustomEngines()
  })

  test('default', async () => {
    const options = {}
    await runTest(options)
  })

  test('env(PRISMA_CLI_QUERY_ENGINE_TYPE=binary)', async () => {
    const options = {
      env: {
        PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
      },
    }
    await runTest(options)
  })

  test('env(PRISMA_QUERY_ENGINE_LIBRARY): uses supplied library', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
      },
    }
    await runTest(options)
  })

  test('env(PRISMA_CLI_QUERY_ENGINE_TYPE=binary, PRISMA_QUERY_ENGINE_LIBRARY, PRISMA_QUERY_ENGINE_BINARY): uses supplied binary for CLI and supplied library for Client', async () => {
    const options = {
      env: {
        PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
        PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
      },
    }
    await runTest(options)
  })
})
