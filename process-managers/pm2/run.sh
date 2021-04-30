#!/bin/sh

set -eux

yarn install
yarn prisma generate

yarn pm2 start --name prisma-pm2 --interpreter node "./server.js" -f
sleep 10
