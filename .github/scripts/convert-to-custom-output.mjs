import path from 'path'
import fs from 'node:fs/promises'
import { glob } from 'glob'

const projectPath = process.argv[2]

const schemaFile = path.join(projectPath, 'prisma', 'schema.prisma')
await replaceInFile(schemaFile, /provider\s*=\s*"prisma-client-js"/, '$&\noutput="client"')

const sourceFiles = glob.stream('**/*.{js,mjs,ts,mts}', {
  cwd: projectPath,
  absolute: true,
  ignore: ['node_modules/**', '*test*'],
})

let numFiles = 0
for await (const file of sourceFiles) {
  let relImport = path.relative(path.dirname(file), path.join(projectPath, 'prisma', 'client'))
  if (!relImport.startsWith('.')) {
    relImport = `./${relImport}`
  }
  await replaceInFile(file, /@prisma\/client/g, relImport)
  numFiles++
}

if (numFiles > 0) {
  console.log('javascript files were correctly modified for the custom output project')
} else {
  console.error('javascript files were not correctly modified for the custom output project')
  process.exitCode = 1
}

async function replaceInFile(absolutePath, pattern, replacement) {
  const contents = await fs.readFile(absolutePath, 'utf8')
  await fs.writeFile(absolutePath, contents.replace(pattern, replacement))
}
