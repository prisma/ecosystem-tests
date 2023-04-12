#!/bin/sh

set -eu

pnpm install
pnpm tsc
pnpm prisma generate
