#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
pnpm prisma migrate reset --force
