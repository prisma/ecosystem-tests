#!/bin/sh

set -eux

rm -rf prisma/migrations/
rm -rf prisma/dev.db

yarn install
yarn prisma2 migrate save --experimental --create-db --name init
yarn prisma2 migrate up --experimental
yarn prisma2 generate

yarn build
yarn start &
pid=$!

sleep 5

curl -v localhost:3000

kill $pid

yarn prisma2 migrate down --experimental
