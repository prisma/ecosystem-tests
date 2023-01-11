const glob = require('glob')
const yaml = require('yaml')

const fs = require('fs')
const path = require('path')
const { exit } = require('process')

/**
 * This script checks if there are folders (= tests) that are not "run" via test.yaml and test.yaml
 *  It gets all relevant folders, then all the jobs from both workflows, and extract those from the list of folder and checks if nothing is left 
 */
async function main() {
  
  // Files and folders to skip during checking
  const ignoreFiles = [
    'package.json', // package.json at root
    'generic/basic', // generic/basic doesn't use Github action matrix feature which we parse to find out the differences
    'platforms-serverless-vercel/vercel-with-redwood/api', // Redwood uses workspaces but is included
    'platforms-serverless-vercel/vercel-with-redwood/web', // Redwood uses workspaces but is included
    'platforms-serverless/firebase-functions/functions', // Firebase root doesn't have package.json but is included
    'packagers/yarn-workspaces/prisma-project', // Yarn workspaces root doesn't have package.json but is included
    'packagers/yarn3-workspaces-pnp/packages/sub-project-1', // We don't want to include the workspace folders in the matrix
    'packagers/yarn3-workspaces-pnp/packages/sub-project-2', // We don't want to include the workspace folders in the matrix
    'platforms/aws-graviton/code', // aws-graviton doesn't have package.json at root but is included
    'platforms/m1-macstadium/code', // m1-macstadium doesn't have package.json at root but is included
  ]
  
  // Jobs in the workflow files that are not relevant and can be skipped
  const jobsToIgnore = [
    'start-time', // Not a test but a job that fills an env var with the job start time
    'report-to-slack-success', // Not a test but a job that posts to slack
    'report-to-slack-failure', // Not a test but a job that posts to slack
    'detect_jobs_to_run', // Not a test but a job that decides which tests should run
    'cleanup-runs', // Not a test but a job that cancels previous runs
  ]
  
  // Keys to ignore
  // TODO better description what this actually means
  const keysToIgnore = [
    'os', // We want to count folders vs references in the yaml file not when something is run across differnt OSes
    'node', // We want to count folders vs references in the yaml file not when something is run across differnt node versions
  ]
  
  // Get all relevant folders that _should_ appear in workflows
  const folders = glob
    .sync('**/package.json', {
      ignore: ['**/node_modules/**', '**/custom-engines/**'],
    })
    .map((file) => file.replace('/package.json', ''))
    .filter((file) => {
      return !ignoreFiles.includes(file)
    })

  // get optional tests workflow
  const optionalTestYamlString = fs.readFileSync(
    path.join(process.cwd(), '.github/workflows/optional-test.yaml'),
    { encoding: 'utf8' },
  )
  const optionalTestYaml = yaml.parse(optionalTestYamlString)

  // get tests workflow
  const testYamlString = fs.readFileSync(
    path.join(process.cwd(), '.github/workflows/test.yaml'),
    { encoding: 'utf8' },
  )
  const testYaml = yaml.parse(testYamlString)

  // get job keys from workflow files
  const jobKeys = Object.keys(optionalTestYaml['jobs'])
    .concat(Object.keys(testYaml['jobs']))
    .filter((key) => {
      return !jobsToIgnore.includes(key)
    })

  // Create an array of job names, from reading the `jobs` keys of the .yml file
  const jobs = jobKeys
    .map((key) => {
      
      // jobs
      const job = testYaml['jobs'][key]
      const matrix = Boolean(job) && Boolean(job.strategy) ? job.strategy.matrix : {}
      const folders = Object.keys(matrix)
        .filter((key) => {
          return !keysToIgnore.includes(key)
        })
        .reduce((acc, key) => acc.concat(...matrix[key]), [])

      // optional jobs
      const job_optional = optionalTestYaml['jobs'][key]
      const matrix_optional = Boolean(job_optional) && Boolean(job_optional.strategy) ? job_optional.strategy.matrix : {}
      const folders_optional = Object.keys(matrix_optional)
        .filter((key) => {
          return !keysToIgnore.includes(key)
        })
        .reduce((acc, key) => acc.concat(...matrix_optional[key]), [])

      return folders.concat(folders_optional).map((folder) => `${key}/${folder}`)
    })
    .reduce((acc, folders) => {
      return acc.concat([...folders])
    }, [])

  // Transform the shape to return something that can be easy to use from GitHub Actions if conditionals
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
    //console.log("all good")
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
