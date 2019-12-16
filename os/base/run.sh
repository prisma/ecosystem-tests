#!/bin/sh

set -eu

rm -rf prisma/migrations/
rm -rf prisma/dev.db

yarn install
yarn prisma2 lift save --create-db --name init
yarn prisma2 lift up
yarn cmd
yarn prisma2 lift down
