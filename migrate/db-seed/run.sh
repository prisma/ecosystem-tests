#!/bin/sh

set -eux

yarn install

# generate not needed, it will be done by db push
# yarn prisma generate
yarn prisma db push --force-reset
