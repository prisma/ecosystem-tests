import { runTest } from './utils'
const os = require('os');

//describe('Library (on ' + os.type() + ')', () => {
describe('Library (on WindowsNT)', () => {

  test('Preview Feature uses default library', async () => {
    const options = {
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  }, 100000)

  test('PRISMA_FORCE_NAPI=true uses default library', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  }, 100000)

  test('PRISMA_FORCE_NAPI=true and Preview Feature uses default library', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  }, 100000)


  test('PRISMA_FORCE_NAPI=true and PRISMA_QUERY_ENGINE_LIBRARY uses supplied library', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
        PRISMA_QUERY_ENGINE_LIBRARY: 'foo.node'
      },
    }
    await runTest(options)
  }, 100000)

  test('Preview Feature and PRISMA_QUERY_ENGINE_LIBRARY uses supplied library', async () => {
    const options = {
      previewFeatures: ['nApi'],
      env: {
        PRISMA_QUERY_ENGINE_LIBRARY: 'foo.node'
      },
    }
    await runTest(options)
  }, 100000)

})
