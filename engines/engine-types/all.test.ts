import { DEFAULT_CLIENT_ENGINE_TYPE, EngineType } from './constants'
import { getCustomBinaryPath, getCustomLibraryPath, runTest } from './utils'

describe(`Engine Types - default(Client=${DEFAULT_CLIENT_ENGINE_TYPE})`, () => {
  // Test Default
  runTest({})

  // ENV Overrides
  runTest({
    env: {
      PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
    },
  })
  runTest({
    env: {
      PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
    },
  })
  runTest({
    env: {
      PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
      PRISMA_QUERY_ENGINE_BINARY: getCustomBinaryPath(),
    },
  })
  runTest({
    env: {
      PRISMA_CLIENT_ENGINE_TYPE: EngineType.Binary,
    },
  })
  runTest({
    env: {
      PRISMA_CLIENT_ENGINE_TYPE: EngineType.Library,
    },
  })
  // Schema
  runTest({
    schema: {
      engineType: EngineType.Binary,
    },
  })
  runTest({
    schema: {
      engineType: EngineType.Library,
    },
  })

  runTest({
    schema: {
      previewFeatures: ['nApi'],
    },
  })
  // Env & Schema
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
      engineType: EngineType.Library,
    },
    env: {
      PRISMA_QUERY_ENGINE_LIBRARY: getCustomLibraryPath(),
    },
  })
})
