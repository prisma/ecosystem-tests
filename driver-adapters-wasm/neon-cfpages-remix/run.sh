#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate
pnpm build

pnpm wrangler pages deploy ./build/client --project-name neon-cfpages-remix | tee deployment-logs.txt
sleep 15