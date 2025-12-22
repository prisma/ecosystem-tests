#!/bin/sh

set -eu

pnpm install
pnpm exec prisma generate
pnpm tsc
pnpm exec prisma -v
