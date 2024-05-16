#!/usr/bin/env ts-node

import * as childProcess from 'child_process'
import util from 'util'

const exec = util.promisify(childProcess.exec)

const PASS = process.env.AES_256_PASS

/**
 * Decrypt a value with AES-256
 * @param value 
 * @returns 
 */
export async function decrypt(value: string) {
    const input = `echo "${value}"`
    const decrypt = `openssl aes-256-cbc -d -a -pass pass:${PASS} -pbkdf2`
    const output = await exec(`${input} | ${decrypt}`)

    if (output.stderr) process.exit(1)

    return output.stdout.trim()
}

/**
 * Decrypt a value via the command line
 * @returns 
 */
async function main() {
    if (require.main !== module) return

    console.log(await decrypt(process.argv[2]))
}

main()