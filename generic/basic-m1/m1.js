// adapted from https://gregmfoster.medium.com/using-m1-mac-minis-to-power-our-github-actions-ios-ci-540c55af13ea

const { execSync } = require('child_process')

const uname = execSync(`uname -m`).toString().trim()
console.log('uname', uname)
const isArm = uname === 'arm64'

let isM1 = false
try {
  // this command will only succeed on m1 macs.
  execSync(`arch -arm64e echo hi`)
  isM1 = true
} catch (err) {
  throw new Error(
    'This test is expected to run on Apple Silicon (e.g. M1/M2) only. Please run it on a machine with an Apple Silicon CPU.',
  )
}

console.log('arm', isArm)
console.log('m1', isM1)
