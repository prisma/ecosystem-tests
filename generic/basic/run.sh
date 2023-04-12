#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

pnpm install
pnpm prisma generate
