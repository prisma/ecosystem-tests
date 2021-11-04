#!/usr/bin/env ts-node

import { decrypt } from "./decrypt";

const envVars = {
    CF_DATA_PROXY_URL: "U2FsdGVkX18aWMCedtp1nKGy8SGsipaJIw5NqyI4ZNQaKmB3f2jnmerKKp5JpAHVLHiQ+8oO3MU7DYhQeaR4RYZaErFgl7Ox1EZ4UBpPFhN10kxZvd5sOOnxhd+WQ4My9l+aOhmF+iz6m3E+k3YxldUqtp/5ej4Xr0NW/toml2RVI+FItfA2GC4Df9PvyfnP",
    CF_ACCOUNT_ID: "U2FsdGVkX1/kgKmF6Nc3rIIkben8az6boItdyzPJFj5vEPoxnWtfpyjEO8E6voHLB4Zl/+kddgTA14uboA+40A==",
    CF_API_TOKEN: "U2FsdGVkX18fx8PpClVvhLV9TuBGm//20tdPUYRowj/hBUw+r7nECbfZ7DBPKgI9lelSXXKOXD4FFNg6FPpURA==",

    VERCEL_DATA_PROXY_URL: "U2FsdGVkX18aWMCedtp1nKGy8SGsipaJIw5NqyI4ZNQaKmB3f2jnmerKKp5JpAHVLHiQ+8oO3MU7DYhQeaR4RYZaErFgl7Ox1EZ4UBpPFhN10kxZvd5sOOnxhd+WQ4My9l+aOhmF+iz6m3E+k3YxldUqtp/5ej4Xr0NW/toml2RVI+FItfA2GC4Df9PvyfnP",
    VERCEL_EDGE_FUNCTIONS_ORG_ID: "U2FsdGVkX1+OynKKazwnZh8yRbrGoapHZmyTDNe2ryNIFCGS/x8ALH8xROfzCdz+",
    VERCEL_EDGE_FUNCTIONS_PROJECT_ID: "U2FsdGVkX1/rvuHFq0MrRcXU3LmvnzZQp8A9/WeoqYg8IllvAJhujSnQOVfSvbqvfBGzk7t/ewBV/uXyQ99Jwg=="
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