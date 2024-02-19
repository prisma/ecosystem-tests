#!/usr/bin/env bash

set -eu

echo "Temporary disabled, because wrangler does not support "--node-compat" flag for pages commands yet. See https://github.com/cloudflare/workers-sdk/pull/2541"
pnpm install

pnpm prisma generate

pnpm wrangler pages functions build --node-compat --outdir build/
pnpm wrangler publish build/index.js --name pg-cfpages-basic --compatibility-date 2024-02-01

sleep 15
