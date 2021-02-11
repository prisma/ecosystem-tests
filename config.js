const tempDirectory = require('temp-dir')

module.exports = {
  onboarding: true, // https://docs.renovatebot.com/self-hosted-configuration/#onboarding
  cacheDir: tempDirectory,
  token: process.env.GH_TOKEN,
  repositories: ['prisma/e2e-tests'],
  requireConfig: true,
  forceCli: true,
  force: {
    ignoreDeps: [],
  },
}
