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
  const stdinData = await getStdin()
  console.log('stdin:', stdinData)

  /**
   * @type string[]
   **/
  const filesChanged = JSON.parse(stdinData)
  console.log('filesChanged:', filesChanged)

  const jobsToRun = {}
  let fallbackToAll = false

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
