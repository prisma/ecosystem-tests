#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
pnpm tsc
rm -rf dist/
pnpm webpack
