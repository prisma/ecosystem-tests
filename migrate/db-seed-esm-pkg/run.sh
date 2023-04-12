#!/bin/sh

set -eux

pnpm install

# generate not needed, it will be done by db push
# pnpm prisma generate
pnpm prisma db push --force-reset
