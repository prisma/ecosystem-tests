import { EngineType } from './constants'
import {
  getCustomBinaryPath,
  getCustomLibraryPath,
  runTest,
} from './utils'

function buildTests() {
  const engineTypes = [
    EngineType.Binary,
    EngineType.Library,
    undefined,
  ] as const
  const PRISMA_CLIENT_ENGINE_TYPE = engineTypes
  const PRISMA_CLI_QUERY_ENGINE_TYPE = engineTypes
  const PRISMA_QUERY_ENGINE_LIBRARY = [undefined, getCustomLibraryPath()]
  const PRISMA_QUERY_ENGINE_BINARY = [undefined, getCustomBinaryPath()]

  engineTypes.forEach((engineType) => {
    PRISMA_CLIENT_ENGINE_TYPE.forEach((clientEngineType) => {
      PRISMA_CLI_QUERY_ENGINE_TYPE.forEach((cliQueryEngineType) => {
        PRISMA_QUERY_ENGINE_LIBRARY.forEach((customQELibrary) => {
          PRISMA_QUERY_ENGINE_BINARY.forEach((customQEBinary) => {
            const options = {
              env: {
                PRISMA_CLI_QUERY_ENGINE_TYPE: cliQueryEngineType,
                PRISMA_CLIENT_ENGINE_TYPE: clientEngineType,
                PRISMA_QUERY_ENGINE_LIBRARY: customQELibrary,
                PRISMA_QUERY_ENGINE_BINARY: customQEBinary,
              },
              schema: {
                engineType: engineType,
              }
            }
            runTest(options)
          })
        })
      })
    })
  })
}
describe.skip('Custom', () => {
  buildTests()
})
