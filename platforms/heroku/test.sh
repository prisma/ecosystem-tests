#!/bin/sh

set -eux

files=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","package.json","query_compiler_bg.js","query_compiler_bg.wasm","query_compiler_bg.wasm-base64.js","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs"]'
pnpm ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-platforms-heroku.herokuapp.com --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $files
