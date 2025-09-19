#!/bin/sh

set -eux

ID=$( tail -n 1 id.txt )

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  files=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","package.json","query-engine-rhel-openssl-3.0.x","query_engine_bg.js","query_engine_bg.wasm","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs","wasm.d.ts","wasm.js"]'
else
  files=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","libquery_engine-rhel-openssl-3.0.x.so.node","package.json","query_engine_bg.js","query_engine_bg.wasm","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs","wasm.d.ts","wasm.js"]'
fi

pnpm ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://$ID--prisma-ecosystem-tests-netlify-github.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $files
