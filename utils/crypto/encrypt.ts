#!/usr/bin/env ts-node

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

    return output.stdout.trim().replace(/\n/g, '')
}

/**
 * Encrypt a value via the command line
 * @returns 
 */
async function main() {
    if (require.main !== module) return

    console.log(await encrypt(process.argv[2]))
}

main()