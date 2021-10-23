#!/usr/bin/env node

import * as childProcess from 'child_process'
import util from 'util'

const exec = util.promisify(childProcess.exec)

const PASS = process.env.AES_256_PASS

/**
 * Encrypt a value with AES-256
 * @param value 
 * @returns 
 */
export async function encrypt(value: string) {
    const input = `echo "${value}"`
    const encrypt = `openssl aes-256-cbc -a -salt -pass pass:${PASS} -pbkdf2`
    const output = await exec(`${input} | ${encrypt}`)

    if (output.stderr) process.exit(1)

    return output.stdout.trim()
}

/**
 * Encrypt an env var via the command line
 * @returns 
 */
async function main() {
    if (require.main !== module) return

    const envVarArg = process.argv.slice(2)[0]
    const equalSignPos = envVarArg.indexOf('=')
    const envVarName = envVarArg.substr(0, equalSignPos)
    const envVarValue = envVarArg.substr(equalSignPos + 1)

    console.log(`${envVarName}=${await encrypt(envVarValue)}`)
}

main()