import { runTest, getCustomEngines, getCustomBinaryPath, getCustomLibraryPath } from './utils'

describe('Binary', () => {

  beforeAll(() => {
    return getCustomEngines()
  })

  test('no options, uses default binary', async () => {
    const options = {}
    const snapshots = {
      engines: 'engine-binary',
      prisma: 'prisma-binary',
      version: 'version-binary',
      client: 'client-binary',
    }
    await runTest(options, snapshots)
  })

  test('PRISMA_QUERY_ENGINE_BINARY, uses supplied binary', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath()
      },
    }
    const snapshots = { // TODO
      engines: 'engine-binary', 
      prisma: 'prisma-binary',
      version: 'version-binary',
      client: 'client-binary',
    }
    await runTest(options, snapshots)
  })

  test('PRISMA_QUERY_ENGINE_LIBRARY (!), uses default binary (and ignores env var)', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath()
      },
    }
    const snapshots = { // TODO
      engines: 'engine-binary',
      prisma: 'prisma-binary',
      version: 'version-binary',
      client: 'client-binary',
    }
    await runTest(options, snapshots)
  })

})
