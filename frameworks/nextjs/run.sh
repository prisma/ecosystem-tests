#!/bin/sh

set -eux

yarn install
yarn prisma2 generate

yarn build
yarn start &
pid=$!

sleep 5

curl localhost:3000

kill $pid
