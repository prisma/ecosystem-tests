#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests driver-adapters-wasm pg-cfpages-basic build'
export PRISMA_CLIENT_ENGINE_TYPE='wasm' # because setup otherwise makes it library/binary

echo "export const DATABASE_URL = '$DATABASE_URL'" > ./fns/dbUrl.js
