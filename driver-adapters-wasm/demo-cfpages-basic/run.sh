#!/usr/bin/env bash

set -eu

pnpm install

# pnpm prisma generate

pnpm wrangler pages deploy . --project-name demo-cfpages-basic | tee deployment-logs.txt
