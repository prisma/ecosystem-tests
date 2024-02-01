#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate

pnpm wrangler pages functions build --node-compat --outdir build/
pnpm wrangler publish build/index.js --name pg-cfpages-basic public

sleep 15
