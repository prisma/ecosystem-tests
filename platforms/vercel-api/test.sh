#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry.ts --url https://vercel-api-mu.now.sh/api --prisma-version $(sh ../../utils/prisma_version.sh)
