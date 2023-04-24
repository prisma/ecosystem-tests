#!/usr/bin/env ts-node

import { decrypt } from './decrypt';
import { envVars } from './envVars'

/**
 * Decrypt a given encrypted entry of `envVars`
 * @param name 
 * @returns 
 */
function get(name: string) {
    if (envVars[name] === undefined) {
        console.error(`${name} does not exist`)
        process.exit(1)
    }

    return decrypt(envVars[name])
}

/**
 * Decrypt and generate export & mask env vars shell commands
 * @returns 
 */
async function main() {
    if (require.main !== module) return

    const envVarNames = process.argv.slice(2)
    for (const name of envVarNames) {
        console.log(`export ${name}="${await get(name)}";`)
        console.log(`echo "::add-mask::$${name}";`)
    }
}

main()