import { runTest, getCustomLibraryPath, getCustomBinaryPath } from './utils'

// TODO set cutom binary (!) path and see if it is ignored
describe('Library', () => {

  test('Preview Feature, uses default binary for CLI and default library for Client', async () => {
    const options = {
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  })

  test('PRISMA_FORCE_NAPI=true, uses default library', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  })

  test('PRISMA_FORCE_NAPI=true and Preview Feature, uses default library', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  })

  test('PRISMA_FORCE_NAPI=true and PRISMA_QUERY_ENGINE_LIBRARY, uses supplied library', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath()
      },
    }
    await runTest(options)
  })

  test('Preview Feature and PRISMA_QUERY_ENGINE_LIBRARY, uses default binary for CLI and supplied library for Client', async () => {
    const options = {
      previewFeatures: ['nApi'],
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath()
      },
    }
    await runTest(options)
  })

  test('PRISMA_FORCE_NAPI=true and Preview Feature and PRISMA_QUERY_ENGINE_LIBRARY, uses supplied library', async () => {
    const options = {
      previewFeatures: ['nApi'],
      env: {
        PRISMA_FORCE_NAPI: 'true',
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath()
      },
    }
    await runTest(options)
  })

  test('Preview Feature and PRISMA_QUERY_ENGINE_LIBRARY and PRISMA_QUERY_ENGINE_BINARY, uses supplied binary for CLI and supplied library for Client', async () => {
    const options = {
      previewFeatures: ['nApi'],
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
        PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
      },
    }
    await runTest(options)
  })
  
})
