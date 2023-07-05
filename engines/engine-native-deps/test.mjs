import * as assert from 'node:assert/strict'
import * as fs from 'node:fs/promises'

import 'zx/globals'

const clientPath = await import.meta.resolve('@prisma/client')
const versionPath = await import.meta.resolve('@prisma/engines-version', clientPath)
const { enginesVersion } = await import(versionPath)

const update = process.argv.includes('--update')

const allEngines = ['query-engine', 'schema-engine', 'libquery_engine.so.node']
const onlyBinaries = ['query-engine', 'schema-engine']

const platforms = {
  'rhel-openssl-1.0.x': allEngines,
  'rhel-openssl-1.1.x': allEngines,
  'rhel-openssl-3.0.x': allEngines,
  'debian-openssl-1.0.x': allEngines,
  'debian-openssl-1.1.x': allEngines,
  'debian-openssl-3.0.x': allEngines,
  'linux-musl': allEngines,
  'linux-musl-openssl-3.0.x': allEngines,
  'linux-arm64-openssl-1.0.x': allEngines,
  'linux-arm64-openssl-1.1.x': allEngines,
  'linux-arm64-openssl-3.0.x': allEngines,
  'linux-musl-arm64-openssl-1.1.x': allEngines,
  'linux-musl-arm64-openssl-3.0.x': allEngines,
  'linux-static-x64': onlyBinaries,
  'linux-static-arm64': onlyBinaries,
}

if (update) {
  await $`rm -rf snapshots`
}

for (const [platform, engineFiles] of Object.entries(platforms)) {
  for (const engine of engineFiles) {
    await $`curl -fO "https://binaries.prisma.sh/all_commits/${enginesVersion}/${platform}/${engine}.gz"`
    await $`gunzip -f ${engine}.gz`
    await $`chmod +x ${engine}`

    // grep exits with code 1 when it can't find anything, hence `nothrow()` to support static binaries
    const deps = await $`readelf -d ${engine} | grep NEEDED | grep -oP '(?<=\\[)[^]]+' | sort -d`.nothrow()
    const snapshotPath = `snapshots/${platform}/${engine}.txt`

    if (update) {
      await $`mkdir -p ${path.dirname(snapshotPath)}`
      await fs.writeFile(snapshotPath, deps.toString())
    } else {
      const snapshottedDeps = await fs.readFile(snapshotPath, 'utf8')
      assert.equal(deps.toString(), snapshottedDeps)
    }
  }
}
