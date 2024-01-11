#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate $PRISMA_GENERATE_FLAG

pnpm wrangler deploy | tee deployment-url.txt
