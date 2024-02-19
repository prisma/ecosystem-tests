#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate

pnpm wrangler pages functions build --node-compat --outdir build/
pnpm wrangler publish build/index.js --name pg-cfpages-basic --compatibility-date 2024-02-01 | tee deployment-logs.txt
# maybe build to another folder and also copy over index.html to make a full "pages build" instead?

sleep 15
