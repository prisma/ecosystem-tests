import { runTest } from './utils'

describe('N-API', () => {
  test('PRISMA_FORCE_NAPI=true and Preview Feature', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  }, 10000)

  test('PRISMA_FORCE_NAPI=true', async () => {
    const options = {
      env: {
        PRISMA_FORCE_NAPI: 'true',
      },
    }
    await runTest(options)
  }, 10000)

  test('Preview Feature', async () => {
    const options = {
      previewFeatures: ['nApi'],
    }
    await runTest(options)
  }, 10000)

  test('Off', async () => {
    const options = {}
    await runTest(options)
  }, 10000)
})
