#!/usr/bin/env bash

set -eu

pnpm install

# --build-env DATAPROXY_COMMON_URL is only needed because of generate during build
pnpm vercel deploy --prod --yes --force \
--token=$VERCEL_TOKEN \
--scope=$VERCEL_ORG_ID \
--build-env DATAPROXY_COMMON_URL=postgres://dummy \
--env DATAPROXY_COMMON_URL="$DATAPROXY_COMMON_URL" \
--build-env DATAPROXY_FLAVOR="$DATAPROXY_FLAVOR" \
--env DATAPROXY_FLAVOR="$DATAPROXY_FLAVOR" \
1> deployment-url.txt
