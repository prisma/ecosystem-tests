#!/bin/sh

set -eu

rm -rf prisma/migrations/
rm -rf prisma/dev.db

yarn install
yarn prisma2 generate
yarn cmd
