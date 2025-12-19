#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate
pnpm tsc

pnpm wrangler deploy | tee deployment-url.txt
