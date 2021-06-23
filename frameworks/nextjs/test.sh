#!/bin/sh

set -eux

yarn start &
pid=$!

sleep 5

curl localhost:3000

# TODO check for engine files

kill $pid
