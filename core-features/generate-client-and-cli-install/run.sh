#!/bin/sh

set -eux

yarn install
yarn remove @prisma/client
yarn remove prisma
mv package.json package.json.backup

yarn global add prisma
export PATH="$(yarn global bin):$PATH"
prisma generate

