#!/bin/sh

set -eux

pnpm start &
pid=$!

sleep 5

curl localhost:3000

# TODO check for engine files

kill $pid
