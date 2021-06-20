import { runTest } from './utils'
const os = require('os');

//describe('Binary first, then Library (on ' + os.type() + ')', () => {
describe('Binary first, then Library (on WindowsNT)', () => {

  test('Binary build, deployment with PRISMA_FORCE_NAPI=true uses default binary for build, default library later', async () => {
    const options = {
      env_on_deploy: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  }, 100000)
  
  test('Binary build, deployment with PRISMA_FORCE_NAPI=true and PRISMA_QUERY_ENGINE_LIBRARY uses default binary for build, supplied library later', async () => {
    const options = {
      env_on_deploy: {
        PRISMA_FORCE_NAPI: 'true',
        PRISMA_QUERY_ENGINE_LIBRARY: 'foo.node'
      },
    }
    await runTest(options)
  }, 100000)

})


