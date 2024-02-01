#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate

pnpm wrangler pages deploy . --project-name pg-cfpages-basic | tee deployment-logs.txt
sleep 15