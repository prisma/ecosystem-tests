#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry.ts --url https://vercel-node-builder.now.sh/ --prisma-version $(sh ../../utils/prisma_version.sh)
