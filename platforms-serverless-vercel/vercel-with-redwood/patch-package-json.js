'use strict'

const fs = require('fs')
const path = require('path')

const repoRoot = path.join(__dirname, '..', '..')
const prismaVersionPath = path.join(repoRoot, '.github', 'prisma-version.txt')

const prismaVersion = fs.readFileSync(prismaVersionPath, 'utf-8').trim()

function patchPackageJson(packageJsonPath) {
  const packageJson = fs.readFileSync(packageJsonPath, 'utf-8')
  const packageManifest = JSON.parse(packageJson)

  packageManifest.resolutions = {
    prisma: prismaVersion,
    '@prisma/client': prismaVersion,
  }

  const patchedPackageJson = JSON.stringify(packageManifest, null, 2)
  fs.writeFileSync(packageJsonPath, patchedPackageJson + '\n')
}

patchPackageJson(path.join(__dirname, 'package.json'))
patchPackageJson(path.join(__dirname, 'api', 'package.json'))
