#!/bin/sh

set -eux

rm -rf prisma/migrations/
rm -rf prisma/dev.db

yarn install
yarn prisma2 generate

yarn build
yarn start &
pid=$!

sleep 5

curl -v localhost:3000

kill $pid
