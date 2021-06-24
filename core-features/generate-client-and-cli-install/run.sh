#!/bin/sh

set -eux

yarn install
yarn remove @prisma/client
yarn remove prisma
mv package.json package.json.backup

yarn prisma generate
