#!/bin/sh

set -eux

pnpm install

pnpm prisma generate
pnpm prisma db push --force-reset
