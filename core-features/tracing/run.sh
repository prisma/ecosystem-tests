#!/bin/sh

set -eux

yarn install
yarn prisma generate

docker-compose up -d

node app.js