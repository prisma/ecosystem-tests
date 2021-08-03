import { EngineType } from './constants'
import { getCustomBinaryPath, getCustomLibraryPath, runTest } from './utils'

describe('Engine Types', () => {
  runTest({})

  runTest({
    env: {
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
    },
  })

  runTest({
    env: {
      PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
    },
  })

  runTest({
    env: {
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
      PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
      PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
    },
  })

  runTest({
    schema: {
      engineType: EngineType.Binary,
    },
  })

  runTest({
    env: {
      PRISMA_CLIENT_ENGINE_TYPE: EngineType.Binary,
    },
  })

  runTest({
    env: {
      PRISMA_CLIENT_ENGINE_TYPE: EngineType.Binary,
      PRISMA_CLI_QUERY_ENGINE_TYPE: EngineType.Binary,
    },
  })

  runTest({
    schema: {
      engineType: EngineType.Binary,
    },
    env: {
      PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
    },
  })
  
  runTest({
    schema: {
      engineType: EngineType.Binary,
    },
    env: {
      PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
    },
  })
})
