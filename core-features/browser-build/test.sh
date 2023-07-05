#!/bin/sh

set -eux

pnpm start &
pid=$!

sleep 5

# TODO Test actual returned data
curl localhost:3000

kill $pid
