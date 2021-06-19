import { runTest } from './utils'
const os = require('os');

describe('Node-API on ' + os.type(), () => {
  test('PRISMA_FORCE_NAPI=true and Preview Feature', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  }, 50000)

  test('PRISMA_FORCE_NAPI=true', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  }, 50000)

  test('Preview Feature', async () => {
    const options = {
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  }, 100000)

  test('Off', async () => {
    const options = {}
    await runTest(options)
  }, 50000)
  
  test('Off, after generate PRISMA_FORCE_NAPI=true', async () => {
    const options = {
      env_after_generate: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  }, 50000)
  
  
  test('Off, after generate PRISMA_FORCE_NAPI=true and PRISMA_QUERY_ENGINE_LIBRARY', async () => {
    const options = {
      env_after_generate: {
        PRISMA_FORCE_NAPI: 'true',
        PRISMA_QUERY_ENGINE_LIBRARY: 'foo.node'
      },
    }
    await runTest(options)
  }, 50000)
})
