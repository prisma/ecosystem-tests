#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate --data-proxy

echo "Test"
