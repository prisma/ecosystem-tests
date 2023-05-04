#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
rm -rf dist/
pnpm rollup src/index.js --file dist/index.js --format cjs
