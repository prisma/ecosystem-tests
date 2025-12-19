#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
pnpm tsc
rm -rf dist/
pnpm rollup src/index.js --file dist/index.js --format cjs
