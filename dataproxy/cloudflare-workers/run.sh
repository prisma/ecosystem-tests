#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate --data-proxy

pnpm wrangler publish | tee deployment-url.txt
