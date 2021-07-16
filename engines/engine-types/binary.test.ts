import { runTest, getCustomEngines, getCustomBinaryPath, getCustomLibraryPath } from './utils'

describe('Binary', () => {

  beforeAll(() => {
    return getCustomEngines()
  })

  test('no options, uses default binary', async () => {
    const options = {}
    await runTest(options)
  })

  test('PRISMA_QUERY_ENGINE_BINARY, uses supplied binary', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath()
      },
    }
    await runTest(options)
  })

  test('PRISMA_QUERY_ENGINE_LIBRARY (!), uses default binary (and ignores env var)', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath()
      },
    }
    await runTest(options)
  })

})
