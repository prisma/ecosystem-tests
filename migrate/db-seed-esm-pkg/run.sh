#!/bin/sh

set -eux

pnpm install

pnpm prisma generate
pnpm tsc
pnpm prisma db push --force-reset
