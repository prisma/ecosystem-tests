#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-vercel-node-builder.prisma.vercel.app/ --prisma-version $(sh ../../utils/prisma_version.sh)
