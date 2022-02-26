#!/bin/sh

set -eux

yarn start &
pid=$!

sleep 5

# TODO Test actual returned data
curl localhost:3000

kill $pid
