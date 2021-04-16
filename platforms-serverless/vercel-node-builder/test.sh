#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-vercel-node-builder.prisma.vercel.app/ --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string ',"files":["index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]'
