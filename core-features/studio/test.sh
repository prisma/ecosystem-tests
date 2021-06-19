#!/bin/sh

set -eu

export DEBUG="*"

yarn prisma studio -p 5555 -b none &
PRISMA_PID=$!

sleep 3 # Studio takes some time to start up
yarn jest

kill -9 $PRISMA_PID