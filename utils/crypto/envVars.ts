#!/usr/bin/env node

import { decrypt } from "./decrypt";

const envVars = {
    CF_DATA_PROXY_URL: "U2FsdGVkX1+ItPw3mYKKEc4YVfK6nnOFZg6Vfciid08=",
    CF_ACCOUNT_ID: "U2FsdGVkX1+ItPw3mYKKEc4YVfK6nnOFZg6Vfciid08=",
    CF_API_TOKEN: "U2FsdGVkX1+ItPw3mYKKEc4YVfK6nnOFZg6Vfciid08="
}

/**
 * Decrypt a given encrypted entry
 * @param name 
 * @returns 
 */
export function get(name: string) {
    if (envVars[name] === undefined) {
        console.error(`${name} does not exist`)
        process.exit(1)
    }

    return decrypt(envVars[name])
}

/**
 * Decrypt, export and mask env vars
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