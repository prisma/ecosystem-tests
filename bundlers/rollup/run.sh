#!/bin/sh

set -eu

yarn install
yarn prisma generate
rm -rf dist/
yarn rollup src/index.js --file dist/index.js --format cjs
