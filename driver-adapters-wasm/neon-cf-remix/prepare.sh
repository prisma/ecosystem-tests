#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests driver-adapters-wasm neon-cf-remix build'
export PRISMA_CLIENT_ENGINE_TYPE='wasm' # because setup otherwise makes it library/binary

cp -fr wrangler.base.toml wrangler.toml # needed for retries
echo "DRIVER_ADAPTERS_NEON_CF_REMIX_DATABASE_URL=\"$DRIVER_ADAPTERS_NEON_CF_REMIX_DATABASE_URL\"" >> wrangler.toml

