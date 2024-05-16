#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests driver-adapters-wasm neon-node-nextjs-edgemw'

wait_for_host() {
  while ! nc -z $1 $2; do
    sleep 0.1
  done
}

pnpm install
pnpm next dev --port 3000 &
# create a `server.pid` file, which will be used in `finally.sh` to kill the process
echo $! > server.pid
echo "http://localhost:3000" > deployment-url.txt
wait_for_host localhost 3000
