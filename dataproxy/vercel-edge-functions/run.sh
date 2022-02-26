#!/usr/bin/env bash

set -eu

yarn install

yarn prisma generate

yarn -s vercel --token=$VERCEL_TOKEN --env PRISMA_CLIENT_ENGINE_TYPE="dataproxy" --env VERCEL_DATA_PROXY_URL="$VERCEL_DATA_PROXY_URL" --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt
