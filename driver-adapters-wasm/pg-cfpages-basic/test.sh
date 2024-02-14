#!/bin/sh

set -eu

echo "Temporary disabled, because wrangler does not support "--node-compat" flag for pages commands yet. See https://github.com/cloudflare/workers-sdk/pull/2541"

# export DEPLOYMENT_URL=$(cat deployment-logs.txt | grep -Eo "(https.*)\.pages\.dev$" --color=never)
# echo $DEPLOYMENT_URL

# pnpm test
