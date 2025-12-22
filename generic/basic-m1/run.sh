#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

# We want to make sure this runs on M1, so we check the architecture
pnpm tsx m1.ts

pnpm install
pnpm prisma generate
