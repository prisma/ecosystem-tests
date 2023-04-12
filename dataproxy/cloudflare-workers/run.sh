#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate --data-proxy

pnpm wrangler publish 2> deployment-url.txt