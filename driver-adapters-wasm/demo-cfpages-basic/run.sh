#!/usr/bin/env bash

set -eu

pnpm install

# pnpm prisma generate

pnpm wrangler pages deploy . | tee deployment-logs.txt
