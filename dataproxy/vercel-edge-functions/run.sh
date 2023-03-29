#!/usr/bin/env bash

set -eu

pnpm install

pnpm vercel deploy --prod --yes --force --token=$VERCEL_TOKEN --env VERCEL_DATA_PROXY_URL="$VERCEL_DATA_PROXY_URL" --scope=$VERCEL_ORG_ID 1> deployment-url.txt
