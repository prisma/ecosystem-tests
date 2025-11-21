#!/bin/sh

set -e

export DEBUG="prisma:*"

pnpm prisma studio -p 5555 -b none &
PRISMA_PID=$!

sleep 3 # Studio takes some time to start up
pnpm jest --ci --runInBand

kill -9 $PRISMA_PID
kill -9 $(lsof -t -i:5555)
