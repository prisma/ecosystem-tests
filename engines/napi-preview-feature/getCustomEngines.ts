const fs = require('fs-extra')
import { install, version } from './utils'
const os = require('os');

// Run this once to gather the relevant query engine files for the current OS (version does not matter, they just need to be present)
async function main() {
  await install()
  await version()
  fs.copySync('./node_modules/@prisma/engines', './custom-engines/binary/' + os.type())

  // TODO library
  process.env.PRISMA_FORCE_NAPI='true'
  await install()
  await version()
  fs.copySync('./node_modules/@prisma/engines', './custom-engines/library/' + os.type())
}
main()

