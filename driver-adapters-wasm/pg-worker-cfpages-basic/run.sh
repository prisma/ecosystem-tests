#!/usr/bin/env bash

set -eu

echo "Temporary disabled, because wrangler does not support "--node-compat" flag for pages commands yet. See https://github.com/cloudflare/workers-sdk/pull/2541"
pnpm install

pnpm prisma generate

# First build the functions using the `--node-compat` flag into the `_worker.js` directory
# (Note that the functions are in the non-standard `fns` directory so that they are not confused with the output `_worker.js` directory.)
# Make sure build folder does not exist
rm -rf build
# Build pages function to build/_worker.js
pnpm wrangler pages functions build fns --outdir build/_worker.js # nodejs_compat enabled in the UI
# Copy index.html to build folder
cp index.html build/index.html
# Now deploy the _worker.js alongside the index.html asset to Pages
pnpm wrangler pages deploy ./build --project-name pg-cfpages-basic -- | tee deployment-logs.txt
sleep 15