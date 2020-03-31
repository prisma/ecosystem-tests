#!/bin/sh

set -eu

yarn install
yarn prisma2 generate
rm -rf dist/
NODE_ENV=production yarn parcel src/index.js --target node
