import { EngineType } from './constants'
import {
  getCustomBinaryPath,
  getCustomEngines,
  getCustomLibraryPath,
  getExpectedEngines,
  runTest,
} from './utils'

function buildTests() {
  const engineTypes = [
    EngineType.Binary,
    EngineType.NodeAPI,
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
              engineType: engineType,
            }
            const expected = getExpectedEngines(options)
            test(`expected(CLI=${expected.cliEngineType}, CLIENT=${expected.clientEngineType}) env(CLIENT=${clientEngineType}, CLI=${cliQueryEngineType} CUSTOM_QE_LIB=${customQELibrary} CUSTOM_QE_BINARY=${customQEBinary}) schema(engineType=${engineType})`, async () => {
              await runTest(options)
            })
          })
        })
      })
    })
  })
}
describe.skip('Custom', () => {
  beforeAll(() => {
    return getCustomEngines()
  })

  buildTests()
})
