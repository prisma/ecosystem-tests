#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests databases heroku-pgbouncer build'
pnpm install
pnpm prisma generate
