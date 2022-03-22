#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests databases supabase-pool build'
yarn install
yarn prisma generate
