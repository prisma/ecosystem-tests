const { detectJobsTorun } = require('./detect-jobs-to-run')
// @ts-check

//
// This is running automatically with the `test and lint test suite` job
//
// To run manually this file:
// `npx jest detect-jobs-to-run`
// `npx jest detect-jobs-to-run -u` to update snapshots
//

describe('detect-jobs-to-run', () => {
  it('no files changed', async () => {
    const filesChanged = []
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Object {
  "binaries": true,
  "bundlers": true,
  "core-features": true,
  "databases": true,
  "databases-macos": true,
  "dataproxy": true,
  "docker": true,
  "engines": true,
  "frameworks": true,
  "libraries": true,
  "migrate": true,
  "node": true,
  "os": true,
  "packagers": true,
  "platforms": true,
  "platforms-serverless": true,
  "platforms-serverless-vercel": true,
  "process-managers": true,
  "test-runners": true,
}
`)
  })

  it('files changed inside platform folder only', async () => {
    const filesChanged = ['platforms/somefile.js']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Object {
  "binaries": false,
  "bundlers": false,
  "core-features": false,
  "databases": false,
  "databases-macos": false,
  "dataproxy": false,
  "docker": false,
  "engines": false,
  "frameworks": false,
  "libraries": false,
  "migrate": false,
  "node": false,
  "os": false,
  "packagers": false,
  "platforms": true,
  "platforms-serverless": false,
  "process-managers": false,
  "test-runners": false,
}
`)
    expect(jobsToRun.platforms).toBe(true)
    expect(jobsToRun['platforms-serverless']).toBe(false)
  })

  it('files changed inside platform & databases directories only', async () => {
    const filesChanged = ['platforms/somefile.js', 'databases/somefile.js']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Object {
  "binaries": false,
  "bundlers": false,
  "core-features": false,
  "databases": true,
  "databases-macos": false,
  "dataproxy": false,
  "docker": false,
  "engines": false,
  "frameworks": false,
  "libraries": false,
  "migrate": false,
  "node": false,
  "os": false,
  "packagers": false,
  "platforms": true,
  "platforms-serverless": false,
  "process-managers": false,
  "test-runners": false,
}
`)
    expect(jobsToRun.platforms).toBe(true)
    expect(jobsToRun['platforms-serverless']).toBe(false)
    expect(jobsToRun.databases).toBe(true)
    expect(jobsToRun['databases-macos']).toBe(false)
  })

  it('should fallback: no change', async () => {
    const filesChanged = []
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Object {
  "binaries": true,
  "bundlers": true,
  "core-features": true,
  "databases": true,
  "databases-macos": true,
  "dataproxy": true,
  "docker": true,
  "engines": true,
  "frameworks": true,
  "libraries": true,
  "migrate": true,
  "node": true,
  "os": true,
  "packagers": true,
  "platforms": true,
  "platforms-serverless": true,
  "platforms-serverless-vercel": true,
  "process-managers": true,
  "test-runners": true,
}
`)
    expect(jobsToRun.platforms).toBe(true)
    expect(jobsToRun.databases).toBe(true)
  })

  it('should fallback: files changed inside & outside directories', async () => {
    const filesChanged = ['.github/workflows/detect-jobs-to-run.js', 'platforms/somefile.js', 'databases/somefile.js']
    const jobsToRun = await detectJobsTorun({ filesChanged })

    expect(jobsToRun).toMatchInlineSnapshot(`
Object {
  "binaries": true,
  "bundlers": true,
  "core-features": true,
  "databases": true,
  "databases-macos": true,
  "dataproxy": true,
  "docker": true,
  "engines": true,
  "frameworks": true,
  "libraries": true,
  "migrate": true,
  "node": true,
  "os": true,
  "packagers": true,
  "platforms": true,
  "platforms-serverless": true,
  "platforms-serverless-vercel": true,
  "process-managers": true,
  "test-runners": true,
}
`)
    expect(jobsToRun.platforms).toBe(true)
    expect(jobsToRun.databases).toBe(true)
  })

  it('should fallback: branch is dev', async () => {
    const filesChanged = []
    const jobsToRun = await detectJobsTorun({ filesChanged, GITHUB_REF: 'refs/heads/dev' })

    expect(jobsToRun).toMatchInlineSnapshot(`
Object {
  "binaries": true,
  "bundlers": true,
  "core-features": true,
  "databases": true,
  "databases-macos": true,
  "dataproxy": true,
  "docker": true,
  "engines": true,
  "frameworks": true,
  "libraries": true,
  "migrate": true,
  "node": true,
  "os": true,
  "packagers": true,
  "platforms": true,
  "platforms-serverless": true,
  "platforms-serverless-vercel": true,
  "process-managers": true,
  "test-runners": true,
}
`)
    expect(jobsToRun.platforms).toBe(true)
    expect(jobsToRun.databases).toBe(true)
  })
})
