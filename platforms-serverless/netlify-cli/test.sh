#!/bin/sh

set -eux

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  BINARY_STRING=',"files":["index-browser.js","index.d.ts","index.js","package.json","query-engine-rhel-openssl-1.0.x","runtime","schema.prisma"]'
else
  BINARY_STRING=',"files":["index-browser.js","index.d.ts","index.js","libquery_engine-rhel-openssl-1.0.x.so.node","package.json","runtime","schema.prisma"]'
fi

# TODO Use individual deployment URL
pnpm ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://prisma-ecosystem-tests-netlify-cli.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $BINARY_STRING
