#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests driver-adapters turso-cf-basic build'
export PRISMA_CLIENT_ENGINE_TYPE='wasm' # because setup otherwise makes it library/binary

# we add the data proxy URL into the configuration file directly
cp -fr wrangler.base.toml wrangler.toml # needed for retries
echo "DRIVER_ADAPTERS_TURSO_CF_BASIC_DATABASE_URL=\"$DRIVER_ADAPTERS_TURSO_CF_BASIC_DATABASE_URL\"" >> wrangler.toml
echo "DRIVER_ADAPTERS_TURSO_CF_BASIC_TOKEN=\"$DRIVER_ADAPTERS_TURSO_CF_BASIC_TOKEN\"" >> wrangler.toml
