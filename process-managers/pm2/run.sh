#!/bin/sh

set -eux
export DEBUG="*"
pnpm install
pnpm prisma generate

pnpm pm2 start --name prisma-pm2 --interpreter node "./server.js" -f
sleep 10
