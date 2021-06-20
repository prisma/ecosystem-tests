import { runTest } from './utils'
const os = require('os');

//describe('Binary (on ' + os.type() + ')', () => {
describe('Binary (on WindowsNT)', () => {

  test('no options', async () => {
    const options = {}
    await runTest(options)
  }, 100000)

  test('PRISMA_QUERY_ENGINE_BINARY uses supplied binary', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_BINARY: 'foo.query-engine'
      },
    }
    await runTest(options)
  }, 100000)

  test('PRISMA_QUERY_ENGINE_LIBRARY (!) uses default binary', async () => {
    // should just normally use binary
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: 'foo.node'
      },
    }
    await runTest(options)
  }, 100000)

})
