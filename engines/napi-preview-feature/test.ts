import { runTest } from './utils'
const os = require('os');

describe('Engine Type on ' + os.type(), () => {

  describe('Binary', () => {

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

  describe('Library', () => {

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

  describe('Binary first, then Library', () => {

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

})
