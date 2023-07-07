#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy cloudflare-workers build'

# we add the data proxy URL into the configuration file directly
cp -fr wrangler.base.toml wrangler.toml # needed for retries
echo "DATAPROXY_COMMON_URL=\"$DATAPROXY_COMMON_URL\"" >> wrangler.toml
echo "DATAPROXY_FLAVOR=\"$DATAPROXY_FLAVOR\"" >> wrangler.toml
