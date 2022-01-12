#!/usr/bin/env node
// @ts-check

// This was originally done in prisma/prisma repository and adapted to e2e
// https://github.com/prisma/prisma/blob/main/.github/workflows/detect-jobs-to-run.js

const yaml = require('yaml')
const fs = require('fs')
const path = require('path')
const { stdin } = process

// From https://github.com/sindresorhus/get-stdin/blob/main/index.js
async function getStdin() {
  let result = ''

  if (stdin.isTTY) {
    return result
  }

  stdin.setEncoding('utf8')

  for await (const chunk of stdin) {
    result += chunk
  }

  return result
}

async function main() {
  const testYamlString = fs.readFileSync(
    path.join(process.cwd(), '.github/workflows/test.yaml'),
    { encoding: 'utf8' },
  )
  const testYaml = yaml.parse(testYamlString)

  // ['process-managers', 'docker', 'core-features', ...]
  const testDirectories = Object.keys(testYaml['jobs'])
    .concat(Object.keys(testYaml['jobs']))
    .filter((key) => {
      const jobsToIgnore = [
        'start-time', // Not a test but a job that fills an env var with the job start time
        'report-to-slack-success', // Not a test but a job that posts to slack
        'report-to-slack-failure', // Not a test but a job that posts to slack
        'detect_jobs_to_run', // Not a test but a job that decides which tests should run
        'cleanup-runs', // Not a test but a job that cancels previous runs
      ]
      return !jobsToIgnore.includes(key)
    })
  console.debug(testDirectories)

  const { GITHUB_REF } = process.env

  // Object used as output
  const jobsToRun = {}

  // If true we will run all tests
  let fallbackToAll = false

  // Get which files changed from the action via stdin
  const stdinData = await getStdin()
  console.debug('stdin:', stdinData)
  const filesChanged = JSON.parse(stdinData)
  console.debug('filesChanged:', filesChanged)

  // If we are in one of our special branches we always run all tests
  if (
    [
      'refs/heads/dev',
      'refs/heads/patch-dev',
      'refs/heads/latest',
      'refs/heads/integration',
    ].includes(GITHUB_REF)
  ) {
    console.debug(
      `GITHUB_REF=${GITHUB_REF} - special branch detected, settting fallbackToAll to true`,
    )
    fallbackToAll = true
  }

  /**
   * @type string[]
   **/

  for (const directoryName of testDirectories) {
    // If changes are located only in one of the directories
    if (
      filesChanged.every((fileChanged) => fileChanged.startsWith(directoryName))
    ) {
      jobsToRun[directoryName] = true
    } else {
      jobsToRun[directoryName] = false
      fallbackToAll = true
    }
  }

  console.debug('fallbackToAll:', fallbackToAll)
  console.debug('jobsToRun:', jobsToRun)

  if (fallbackToAll) {
    console.debug('Fallback! All directories must be tested.')
    // creates an object with all values set to true
    const fallbackRunAll = testDirectories.reduce(
      (acc, curr) => ((acc[curr] = true), acc),
      {},
    )
    console.debug('fallbackRunAll:', fallbackRunAll)
    console.log('::set-output name=jobs::' + JSON.stringify(fallbackRunAll))
  } else {
    console.debug('Only one directory will be tested')
    console.log('::set-output name=jobs::' + JSON.stringify(jobsToRun))
  }
}

main().then(function () {
  console.log('Done!')
})
