import * as assert from 'node:assert/strict'
import * as fs from 'node:fs/promises'

import 'zx/globals'

const clientPath = await import.meta.resolve('@prisma/client')
const versionPath = await import.meta.resolve('@prisma/engines-version', clientPath)
const { enginesVersion } = await import(versionPath)

const update = process.argv.includes('--update')

const engineFiles = ['query-engine', 'migration-engine', `libquery_engine.so.node`]

const platforms = [
  'rhel-openssl-1.0.x',
  'rhel-openssl-1.1.x',
  'rhel-openssl-3.0.x',
  'debian-openssl-1.0.x',
  'debian-openssl-1.1.x',
  'debian-openssl-3.0.x',
  'linux-musl',
  'linux-musl-openssl-3.0.x',
  'linux-arm64-openssl-1.0.x',
  'linux-arm64-openssl-1.1.x',
  'linux-arm64-openssl-3.0.x',
  'linux-musl-arm64-openssl-1.1.x',
  'linux-musl-arm64-openssl-3.0.x',
]

if (update) {
  await $`rm -rf snapshots`
}

for (const platform of platforms) {
  for (const engine of engineFiles) {
    await $`curl -fO "https://binaries.prisma.sh/all_commits/${enginesVersion}/${platform}/${engine}.gz"`
    await $`gunzip -f ${engine}.gz`
    await $`chmod +x ${engine}`

    const deps = await $`readelf -d ${engine} | grep NEEDED | grep -oP '(?<=\\[)[^]]+' | sort`
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
