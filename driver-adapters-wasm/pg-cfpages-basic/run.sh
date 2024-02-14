#!/usr/bin/env bash

set -eu

echo "Temporary disabled, because wrangler does not support "--node-compat" flag for pages commands yet. See https://github.com/cloudflare/workers-sdk/pull/2541"
pnpm install

pnpm prisma generate

# pnpm wrangler pages deploy . --project-name pg-cfpages-basic --node-compat | tee deployment-logs.txt
# sleep 15