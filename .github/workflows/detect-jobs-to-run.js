#!/usr/bin/env node
// @ts-check

// This was originally done in prisma/prisma repository and adapted to e2e
// https://github.com/prisma/prisma/blob/main/.github/workflows/detect-jobs-to-run.js

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
  const testDirectories = [
    'process-managers',
    'docker',
    'core-features',
    'migrate',
    'engine',
    'os',
    'node',
    'binaries',
    'packagers',
    'frameworks',
    'platforms',
    'paltforms-serverless',
    'workers',
    'bundlers',
    'libraries',
    'databases',
    'databases-macos',
    'test-runners',
  ]

  const { GITHUB_REF } = process.env

  // Object used as output
  const jobsToRun = {}

  // If true we will run all tests
  let fallbackToAll = false

  // Get which files changed from the action via stdin
  const stdinData = await getStdin()
  console.log('stdin:', stdinData)
  const filesChanged = JSON.parse(stdinData)
  console.log('filesChanged:', filesChanged)

  // If we are in one of our special branches we always run all tests
  if (
    [
      'refs/heads/dev',
      'refs/heads/patch-dev',
      'refs/heads/latest',
      'refs/heads/integration',
    ].includes(GITHUB_REF)
  ) {
    console.log(
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

  console.log('fallbackToAll:', fallbackToAll)
  console.log('jobsToRun:', jobsToRun)

  if (fallbackToAll) {
    console.log('Fallback! All directories must be tested.')
    // creates an object with all values set to true
    const fallbackRunAll = testDirectories.reduce(
      (acc, curr) => ((acc[curr] = true), acc),
      {},
    )
    console.log('fallbackRunAll:', fallbackRunAll)
    console.log('::set-output name=jobs::' + JSON.stringify(fallbackRunAll))
  } else {
    console.log('Only one directory will be tested')
    console.log('::set-output name=jobs::' + JSON.stringify(jobsToRun))
  }
}

main().then(function () {
  console.log('Done!')
})
