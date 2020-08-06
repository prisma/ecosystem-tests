#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry.ts --url https://e2e-vercel-node-builder.vercel.app/ --prisma-version $(sh ../../utils/prisma_version.sh)
