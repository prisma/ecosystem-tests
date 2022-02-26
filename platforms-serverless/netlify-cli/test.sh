#!/bin/sh

set -eux

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  BINARY_STRING=',"files":["index-browser.js","index.d.ts","index.js","query-engine-rhel-openssl-1.0.x","runtime","schema.prisma"]'
else
  BINARY_STRING=',"files":["index-browser.js","index.d.ts","index.js","libquery_engine-rhel-openssl-1.0.x.so.node","runtime","schema.prisma"]'
fi

# TODO Use individual deployment URL
npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://prisma2-e2e-tests-netlify-cli.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $BINARY_STRING
