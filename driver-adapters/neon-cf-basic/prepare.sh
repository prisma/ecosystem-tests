#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests driver-adapters neon-cf-basic build'
export PRISMA_CLIENT_ENGINE_TYPE='wasm'

# we add the data proxy URL into the configuration file directly
cp -fr wrangler.base.toml wrangler.toml # needed for retries
echo "DRIVER_ADAPTERS_NEON_CF_BASIC_DATABASE_URL=\"$DRIVER_ADAPTERS_NEON_CF_BASIC_DATABASE_URL\"" >> wrangler.toml

