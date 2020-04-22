#!/bin/sh

set -eu

rm -rf node_modules/
yarn
yarn build # prisma generate

prisma_version="$(cat ../../.github/prisma-version.txt)"
node test.js