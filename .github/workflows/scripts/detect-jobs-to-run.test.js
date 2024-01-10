const { detectJobsTorun } = require('./detect-jobs-to-run')
// @ts-check

//
// This is running automatically with the `test and lint test suite` job
//
// To run manually this file:
// `pnpm jest detect-jobs-to-run`
// `pnpm jest detect-jobs-to-run -u` to update snapshots
//

describe('detect-jobs-to-run', () => {
  it('no files changed', async () => {
    const filesChanged = []
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "process-managers",
  "docker",
  "docker-unsupported",
  "core-features",
  "migrate",
  "engines",
  "os",
  "node",
  "binaries",
  "packagers",
  "frameworks",
  "platforms",
  "platforms-serverless",
  "platforms-serverless-vercel",
  "driver-adapters",
  "driver-adapters-wasm",
  "dataproxy",
  "bundlers",
  "libraries",
  "databases",
  "databases-macos",
  "test-runners",
  "community-generators",
]
`)
  })

  it('files changed inside platform folder only', async () => {
    const filesChanged = ['platforms/somefile.js']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "platforms",
]
`
)
    expect(jobsToRun.includes('platforms')).toBe(true)
    expect(jobsToRun.includes('platforms-serverless')).toBe(false)
  })

  it('files changed inside platform & databases directories only', async () => {
    const filesChanged = ['platforms/somefile.js', 'databases/somefile.js']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "platforms",
  "databases",
]
`
)
    expect(jobsToRun.includes('platforms')).toBe(true)
    expect(jobsToRun.includes('platforms-serverless-vercel')).toBe(false)
    expect(jobsToRun.includes('platforms-serverless')).toBe(false)
    expect(jobsToRun.includes('databases')).toBe(true)
    expect(jobsToRun.includes('databases-macos')).toBe(false)
  })

  it('files changed inside community-generators directory only', async () => {
    const filesChanged = [
      'community-generators/typegraphql-prisma/package.json',
      'community-generators/typegraphql-prisma/something.js',
    ]
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "community-generators",
]
`
)

    expect(jobsToRun.includes('community-generators')).toBe(true)
  })

  it.only('files changed inside platform folder and github actions workflow', async () => {
    const filesChanged = ['platforms/somefile.js', '.github/workflows/test.yaml']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "platforms",
]
`
)
    expect(jobsToRun.includes('platforms')).toBe(true)
    expect(jobsToRun.includes('platforms-serverless')).toBe(false)
  })

  it('should fallback: no change', async () => {
    const filesChanged = []
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "process-managers",
  "docker",
  "docker-unsupported",
  "core-features",
  "migrate",
  "engines",
  "os",
  "node",
  "binaries",
  "packagers",
  "frameworks",
  "platforms",
  "platforms-serverless",
  "platforms-serverless-vercel",
  "driver-adapters",
  "driver-adapters-wasm",
  "dataproxy",
  "bundlers",
  "libraries",
  "databases",
  "databases-macos",
  "test-runners",
  "community-generators",
]
`)
    expect(jobsToRun.includes('platforms')).toBe(true)
    expect(jobsToRun.includes('databases')).toBe(true)
  })

  it('should fallback: files changed inside & outside directories', async () => {
    const filesChanged = ['.github/workflows/detect-jobs-to-run.js', 'platforms/somefile.js', 'databases/somefile.js']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "process-managers",
  "docker",
  "docker-unsupported",
  "core-features",
  "migrate",
  "engines",
  "os",
  "node",
  "binaries",
  "packagers",
  "frameworks",
  "platforms",
  "platforms-serverless",
  "platforms-serverless-vercel",
  "driver-adapters",
  "driver-adapters-wasm",
  "dataproxy",
  "bundlers",
  "libraries",
  "databases",
  "databases-macos",
  "test-runners",
  "community-generators",
]
`)
    expect(jobsToRun.includes('platforms')).toBe(true)
    expect(jobsToRun.includes('databases')).toBe(true)
  })

  it('should fallback: branch is dev', async () => {
    const filesChanged = []
    const jobsToRun = await detectJobsTorun({ filesChanged, GITHUB_REF: 'refs/heads/dev' })

    expect(jobsToRun).toMatchInlineSnapshot(`
Array [
  "process-managers",
  "docker",
  "docker-unsupported",
  "core-features",
  "migrate",
  "engines",
  "os",
  "node",
  "binaries",
  "packagers",
  "frameworks",
  "platforms",
  "platforms-serverless",
  "platforms-serverless-vercel",
  "driver-adapters",
  "driver-adapters-wasm",
  "dataproxy",
  "bundlers",
  "libraries",
  "databases",
  "databases-macos",
  "test-runners",
  "community-generators",
]
`)
    expect(jobsToRun.includes('platforms')).toBe(true)
    expect(jobsToRun.includes('databases')).toBe(true)
  })
})
