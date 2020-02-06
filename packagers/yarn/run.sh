#!/bin/sh

set -eu

rm -rf prisma/migrations/

yarn install
yarn prisma2 generate
yarn ts-node ./script.ts
