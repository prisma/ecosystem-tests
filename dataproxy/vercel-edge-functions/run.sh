#!/usr/bin/env bash

set -eu

pnpm install

pnpm vercel deploy --prod --yes --force --token=$VERCEL_TOKEN --env DATAPROXY_COMMON_URL="$DATAPROXY_COMMON_URL" --env PRISMA_GENERATE_FLAG="$PRISMA_GENERATE_FLAG" --scope=$VERCEL_ORG_ID 1> deployment-url.txt
