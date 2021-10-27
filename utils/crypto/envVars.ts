#!/usr/bin/env ts-node

import { decrypt } from "./decrypt";

const envVars = {
    CF_DATA_PROXY_URL: "U2FsdGVkX1+lmUv1EuHjvyIv1lhPgqgIFnx7IkabaGkchigC2NHjZ6FVIBTC0pMNNo1OvdqLB6vGqHf7CFA+bXgtqkSdEStLQyys1L6WQnEUNEJn6PvtDwT5DOXE0gYHoUitFM9VP9yQI8BolMGZWYWpV7PT8UTxZuf7o+EaTqY8AsXXRF6YrKQGdM1aviY6",
    CF_ACCOUNT_ID: "U2FsdGVkX1/kgKmF6Nc3rIIkben8az6boItdyzPJFj5vEPoxnWtfpyjEO8E6voHLB4Zl/+kddgTA14uboA+40A==",
    CF_API_TOKEN: "U2FsdGVkX18fx8PpClVvhLV9TuBGm//20tdPUYRowj/hBUw+r7nECbfZ7DBPKgI9lelSXXKOXD4FFNg6FPpURA=="
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