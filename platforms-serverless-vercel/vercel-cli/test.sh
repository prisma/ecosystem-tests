#!/bin/sh

set -eux

files=',"files":["default.js","index.js","package.json","query_compiler_bg.js","query_compiler_bg.wasm-base64.js"]'
# TODO Use deployment, not production
pnpm tsx ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-vercel-api.vercel.app/api --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $files
