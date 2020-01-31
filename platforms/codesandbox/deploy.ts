import fetch from 'node-fetch'
import fs from 'fs'

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
  console.log(endpoint)
  await fetch(endpoint)
}

main()
