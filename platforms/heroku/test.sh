#!/bin/sh

set -eux

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  files=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","package.json","query-engine-debian-openssl-3.0.x","query_compiler_bg.wasm","query_compiler_bg.wasm","runtime","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs","wasm.d.ts","wasm.js"]'
  pnpm ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-platforms-heroku-binary.herokuapp.com --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $files
else
  files=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","libquery_engine-debian-openssl-3.0.x.so.node","package.json","query_compiler_bg.wasm","query_compiler_bg.wasm","runtime","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs","wasm.d.ts","wasm.js"]'
  pnpm ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-platforms-heroku.herokuapp.com --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $files
fi
