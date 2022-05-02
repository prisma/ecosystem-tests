const glob = require('glob')
const yaml = require('yaml')

const fs = require('fs')
const path = require('path')

async function main() {
  const folders = glob
    .sync('**/package.json', {
      ignore: ['**/node_modules/**', '**/custom-engines/**'],
    })
    .map((file) => file.replace('/package.json', ''))
    .filter((file) => {
      const ignoreFiles = [
        'package.json', // package.json at root
        'platforms-serverless/vercel-with-redwood/api', // Redwood uses workspaces but is included
        'platforms-serverless/vercel-with-redwood/web', // Redwood uses workspaces but is included
        'platforms-serverless/firebase-functions/functions', // Firebase root doesn't have package.json but is included
        'generic/basic', // generic/basic doesn't use Github action matrix feature which we parse to find out the differences
        'packagers/yarn-workspaces/prisma-project', // Yarn workspaces root doesn't have package.json but is included
        'packagers/yarn3-workspaces-pnp/packages/sub-project-1', // We don't want to include the workspace folders in the matrix
        'packagers/yarn3-workspaces-pnp/packages/sub-project-2', // We don't want to include the workspace folders in the matrix
        'platforms/aws-graviton/code', // aws-graviton doesn't have package.json at root but is included
        'platforms/m1-macstadium/code', // m1-macstadium doesn't have package.json at root but is included
      ]
      return !ignoreFiles.includes(file)
    })

  const optionalTestYamlString = fs.readFileSync(
    path.join(process.cwd(), '.github/workflows/optional-test.yaml'),
    { encoding: 'utf8' },
  )
  const optionalTestYaml = yaml.parse(optionalTestYamlString)

  const testYamlString = fs.readFileSync(
    path.join(process.cwd(), '.github/workflows/test.yaml'),
    { encoding: 'utf8' },
  )
  const testYaml = yaml.parse(testYamlString)

  const jobKeys = Object.keys(optionalTestYaml['jobs'])
    .concat(Object.keys(testYaml['jobs']))
    .filter((key) => {
      const jobsToIgnore = [
        'report-to-slack-success', // Not a test but a job that posts to slack
        'report-to-slack-failure', // Not a test but a job that posts to slack
        'detect_jobs_to_run', // Not a test but a job that decides which tests should run
        'cleanup-runs', // Not a test but a job that cancels previous runs
      ]
      return !jobsToIgnore.includes(key)
    })
  const jobs = jobKeys
    .map((key) => {
      const job = testYaml['jobs'][key] || optionalTestYaml['jobs'][key]
      const matrix =
        Boolean(job) && Boolean(job.strategy) ? job.strategy.matrix : {}
      const folders = Object.keys(matrix)
        .filter((key) => {
          const keysToIgnore = [
            'os', // We want to count folders vs references in the yaml file not when something is run across differnt OSes
            'node', // We want to count folders vs references in the yaml file not when something is run across differnt node versions
          ]
          return !keysToIgnore.includes(key)
        })
        .reduce((acc, key) => acc.concat(...matrix[key]), [])
      return folders.map((folder) => `${key}/${folder}`)
    })
    .reduce((acc, folders) => {
      return acc.concat([...folders])
    }, [])

  const foldersObj = folders.reduce((acc, folder) => {
    return {
      ...acc,
      [folder]: 1,
    }
  }, {})

  jobs.forEach((job) => {
    delete foldersObj[job]
  })

  const remainingFolders = Object.keys(foldersObj)

  if (remainingFolders.length === 0) {
    process.exit(0)
  } else {
    console.log(
      'There are some folders in ecosystem-tests that are not used in test.yaml or optional-test.yaml workflows',
    )
    console.log(remainingFolders)
    process.exit(1)
  }
}

main()
