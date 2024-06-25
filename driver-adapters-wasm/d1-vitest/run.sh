#!/usr/bin/env bash

set -eu

pnpm install
pnpm prisma generate

# Vitest is run locally, we don't need to deploy the database migration
pnpm wrangler d1 migrations apply d1-vitest --local
