#!/usr/bin/env bash

set -eu

yarn install

yarn -s vercel --token=$VERCEL_TOKEN --env VERCEL_DATA_PROXY_URL="$VERCEL_DATA_PROXY_URL" --prod --scope=$VERCEL_ORG_ID --yes --force 1> deployment-url.txt
