#!/usr/bin/env bash

set -eu

pnpm install

pnpm prisma generate

pnpm wrangler deploy | tee deployment-logs.txt
