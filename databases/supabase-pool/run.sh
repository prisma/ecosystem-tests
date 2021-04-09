#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests databases supabase-pool build'
yarn install
yarn prisma generate
