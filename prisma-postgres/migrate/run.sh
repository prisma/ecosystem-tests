#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
pnpm tsc
pnpm prisma migrate reset --force
