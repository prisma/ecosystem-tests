import fetch from 'node-fetch'
import fs from 'fs'
import puppeteer from 'puppeteer'

interface CSBFile {
  content: object | string
  isBinary?: Boolean
}

interface CSBFiles {
  [index: string]: CSBFile
}

function getBinaries() {
  return ['prisma/dev.db']
}

function getEncoding(file: string) {
  // Because we used touch prisma/dev.db to get around
  // TODO: Add issue link
  return 'utf-8'
  // const binaries = getBinaries()
  // return binaries.includes(file) ? 'binary' : 'utf-8'
}

function isBinary(file: string) {
  // Because we used touch prisma/dev.db to get around
  // TODO: Add issue link
  return false
  // const binaries = getBinaries()
  // return binaries.includes(file)
}

async function fetchWithPuppeteer(endpoint) {
  const options = {
    ...(process.env.CI === '1' && {
      executablePath: 'google-chrome-unstable',
    }),
  }
  console.log(options)
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto(endpoint)
  await page.waitFor(6000)
  const screenshot = await page.screenshot()
  fs.writeFileSync('image.png', screenshot)
  await browser.close()
}

async function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(false)
    }, seconds * 1000)
  })
}

let attempts = 0
async function ensureSandbox(endpoint) {
  attempts += 1
  console.log(`Attempt: ${attempts}`)
  if (attempts > 60) {
    return false
  }
  try {
    const r = await fetch(endpoint)
    const data = await r.json()
    console.log(data)
    return true
  } catch (e) {
    console.log(e)
    const sleepTime = 5
    console.log(`Sleeping for ${sleepTime} sec`)
    await sleep(sleepTime)
    console.log(`Retrying`)
    return ensureSandbox(endpoint)
  }
}

async function main() {
  const relevantFilePaths = [
    'src/index.js',
    'prisma/schema.prisma',
    'prisma/dev.db',
    'prisma/migrations/lift.lock',
    'prisma/migrations/20200130133512-init/schema.prisma',
    'prisma/migrations/20200130133512-init/steps.json',
    'package.json',
    'yarn.lock',
  ]

  const files: CSBFiles = relevantFilePaths
    .map(filePath => {
      return {
        filePath,
        content: fs.readFileSync(filePath, {
          encoding: getEncoding(filePath),
        }),
        isBinary: isBinary(filePath),
      }
    })
    .reduce((files, file) => {
      return {
        ...files,
        [`${file.filePath}`]: {
          content: file.content,
          isBinary: file.isBinary,
        },
      }
    }, {})

  let r = fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files,
    }),
  })
  const data = await r
  const json = await data.json()
  fs.writeFileSync('sandbox_id', json.sandbox_id)
  const endpoint = `https://${json.sandbox_id}.sse.codesandbox.io/`
  try {
    await fetchWithPuppeteer(endpoint) // Invoke GUI once to kickstart the sandbox process.
    const r = await ensureSandbox(endpoint)
    if (!Boolean(r)) {
      // Log is fine, no need for an exit code as sh test.sh will fail anyways.
      console.log('Failed to ensure sandbox')
    }
  } catch (e) {
    throw new Error(e)
  }
}

main()
