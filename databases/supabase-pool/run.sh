#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests databases supabase-pool build'
pnpm install
pnpm prisma generate
