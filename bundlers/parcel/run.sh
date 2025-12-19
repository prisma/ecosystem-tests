#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
pnpm tsc
rm -rf dist/
NODE_ENV=production pnpm parcel src/index.js --target node
