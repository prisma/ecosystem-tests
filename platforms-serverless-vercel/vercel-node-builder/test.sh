#!/bin/sh

set -eux
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )

files=',"files":["default.js","index.js","package.json","query_compiler_bg.js","query_compiler_bg.wasm-base64.js"]'

pnpm tsx ../../utils/fetch-retry-and-confirm-version.ts --url $DEPLOYED_URL --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string ${files}
