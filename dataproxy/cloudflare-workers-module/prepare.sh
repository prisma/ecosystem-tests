#!/usr/bin/env bash

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests dataproxy cloudflare-workers build'

source ../../utils/crypto/setEnv.sh CLOUDFLARE_ACCOUNT_ID CLOUDFLARE_API_TOKEN CLOUDFLARE_DATA_PROXY_URL

# we add the data proxy URL into the configuration file directly
cp -fr wrangler.base.toml wrangler.toml # needed for retries
echo "CLOUDFLARE_DATA_PROXY_URL=\"$CLOUDFLARE_DATA_PROXY_URL\"" >> wrangler.toml
