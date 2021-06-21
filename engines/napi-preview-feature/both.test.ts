import { runTest, getCustomLibraryPath, getCustomBinaryPath } from './utils'

describe('Binary first, then Library | ', () => {

  // TODO Skipped as this currently does not work https://github.com/prisma/prisma/issues/7783
  test.skip('Binary build, deployment with PRISMA_FORCE_NAPI=true, uses default binary for build, default library later', async () => {
    const options = {
      env_on_deploy: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  })
  
  // TODO Snapshots on this one do not fully make sense yet, as we can not know yet what engine the Client with the env var is actually using (even when the bianry is present in node_modules for it)
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


