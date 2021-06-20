import { runTest, getCustomLibraryPath, getCustomBinaryPath } from './utils'

describe('Binary first, then Library', () => {

  test('Binary build, deployment with PRISMA_FORCE_NAPI=true, uses default binary for build, default library later', async () => {
    const options = {
      env_on_deploy: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  })
  
  test('Binary build, deployment with PRISMA_FORCE_NAPI=true and PRISMA_QUERY_ENGINE_LIBRARY, uses default binary for build, supplied library later', async () => {
    const options = {
      env_on_deploy: {
        PRISMA_FORCE_NAPI: 'true',
        PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
      },
    }
    await runTest(options)
  })

})


