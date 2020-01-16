#!/bin/sh

set -eu

rm -rf prisma/migrations/
rm -rf prisma/dev.db

yarn install
yarn prisma2 migrate save --experimental --create-db --name init
yarn prisma2 migrate up --experimental
yarn cmd
yarn prisma2 migrate down --experimental
