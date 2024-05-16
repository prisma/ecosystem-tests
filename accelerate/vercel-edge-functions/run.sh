#!/usr/bin/env bash

set -eu

pnpm install

pnpm vercel deploy --prod --yes --force \
--token=$VERCEL_TOKEN \
--scope=$VERCEL_ORG_ID \
--env DATAPROXY_COMMON_URL="$DATAPROXY_COMMON_URL" \
--build-env PRISMA_GENERATE_FLAG="$PRISMA_GENERATE_FLAG" \
--build-env DATAPROXY_FLAVOR="$DATAPROXY_FLAVOR" \
--env DATAPROXY_FLAVOR="$DATAPROXY_FLAVOR" \
1> deployment-url.txt
