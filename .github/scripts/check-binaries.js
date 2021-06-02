// @ts-check
const glob = require('glob')
const findUp = require('find-up')
const { getConfig, EngineTypes } = require('@prisma/sdk')
const { getBinaryName } = require('@prisma/fetch-engine')

const { getPlatform, getNapiName } = require('@prisma/get-platform')

const fs = require('fs')
const path = require('path')
const arg = require('arg')

const LOCATIONS = {
  engines: {
    path: 'node_modules/@prisma/engines',
    expects:
      process.env.PRISMA_FORCE_NAPI === 'true'
        ? [
            EngineTypes.libqueryEngineNapi,
            EngineTypes.introspectionEngine,
            EngineTypes.migrationEngine,
            EngineTypes.prismaFmt,
          ]
        : [
            EngineTypes.queryEngine,
            EngineTypes.introspectionEngine,
            EngineTypes.migrationEngine,
            EngineTypes.prismaFmt,
          ],
  },
  cli: {
    path: 'node_modules/prisma',
    expects: [EngineTypes.queryEngine],
  },
  client: {
    path: 'node_modules/@prisma/client',
    expects: [],
  },
  generatedClient: {
    path: 'node_modules/.prisma/client',
    expects: (useNapi) =>
      useNapi ? [EngineTypes.libqueryEngineNapi] : [EngineTypes.queryEngine],
  },
}
async function checkBinaries(projectPath = process.cwd()) {
  const schemaLocations = glob.sync('**/schema.prisma', {
    ignore: '**/node_modules/**',
  })
  for (const schemaLocation of schemaLocations) {
    const packageJSON = await findUp('package.json', {
      cwd: path.join(projectPath, schemaLocation),
    })
    const projectDir = path.dirname(packageJSON)
    console.log(`\n==== ${projectDir} ==== `)

    //get Expected Binaries
    for (const key in LOCATIONS) {
      const location = LOCATIONS[key]
      const expected = await getExpectedBinaries(
        location,
        schemaLocation,
        projectDir,
      )
      console.log(`- ${key}`)
      // console.log({ expected })
      const p = path.join(projectDir, location.path)
      if (fs.existsSync(p)) {
        const files = fs.readdirSync(p)
        for (const name of expected) {
          // console.log(files)
          if (files.includes(name)) {
            console.log(`✔️  Found ${name}`)
          } else {
            console.log(`❌  Missing ${name}`)
          }
        }
        // console.log(`Missing ${names.join(',')}`)
      } else {
        console.log(`❌  ${key} Folder Not Found`)
      }
      // console.log(item, p)
      // console.log(files)
    }
  }
}
async function getExpectedBinaries(location, schemaLocation, projectDir) {
  const config = await getConfig({
    ignoreEnvVarErrors: true,
    datamodel: fs.readFileSync(schemaLocation, { encoding: 'utf8' }),
    cwd: projectDir,
  })
  const prismaGenerator = config.generators.find(
    (g) => g.name === 'prisma-client-js',
  )
  const previewFeatures = prismaGenerator?.previewFeatures ?? []
  let targets = config.generators?.reduce((acc, val) => {
    if (val.binaryTargets) {
      acc.push(...val.binaryTargets)
    }
    return acc
  }, [])
  targets = targets.length > 0 ? targets : ['native']
  let binaryNames = []
  const expected =
    typeof location.expects === 'function'
      ? location.expects(
          process.env.PRISMA_FORCE_NAPI === 'true' ||
            previewFeatures.includes('nApi'),
        )
      : location.expects
  for (const expectedEngineType of expected) {
    for (const target of targets) {
      let t = target
      if (t === 'native') {
        t = await getPlatform()
      }
      const binaryName =
        expectedEngineType === EngineTypes.libqueryEngineNapi
          ? getNapiName(t, 'fs')
          : getBinaryName(expectedEngineType, t)
      binaryNames.push(binaryName)
    }
  }
  return binaryNames
}

if (require.main === module) {
  const args = arg({
    '--projectPath': String,
  })

  const projectPath = args['--projectPath']
  checkBinaries(projectPath)
}
