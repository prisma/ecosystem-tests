import path from 'path';
import { runTest } from './utils'
const os = require('os');
const OS_BINARY = ((os.type() == 'Windows_NT') ? 'query-engine-windows.exe' : 'query-engine')

//describe('Binary (on ' + os.type() + ')', () => {
describe('Binary (on WindowsNT)', () => {

  test('no options, uses default binary', async () => {
    const options = {}
    await runTest(options)
  })

  test('PRISMA_QUERY_ENGINE_BINARY, uses supplied binary', async () => {
    const options = {
      env: {
        // Using absolute path because of https://github.com/prisma/prisma/issues/7779
        PRISMA_QUERY_ENGINE_BINARY: path.resolve('.', 'custom-engines', os.type(), OS_BINARY)
      },
    }
    await runTest(options)
  })

  test('PRISMA_QUERY_ENGINE_LIBRARY (!), uses default binary (and ignores env var)', async () => {
    const options = {
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: 'foo.node'
      },
    }
    await runTest(options)
  })

})
