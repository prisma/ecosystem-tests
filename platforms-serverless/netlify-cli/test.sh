#!/bin/sh

set -eux

BINARY_STRING=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","package.json","query_compiler_bg.js","query_compiler_bg.wasm","query_compiler_bg.wasm-base64.js","runtime","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs"]'

# TODO Use individual deployment URL
pnpm ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://prisma-ecosystem-tests-netlify-cli.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $BINARY_STRING
