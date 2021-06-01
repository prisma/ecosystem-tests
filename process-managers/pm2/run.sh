#!/bin/sh

set -eux
export DEBUG="*"
yarn install
yarn prisma generate

yarn pm2 start --name prisma-pm2 --interpreter node "./server.js" -f
sleep 10
