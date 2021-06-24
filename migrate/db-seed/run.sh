#!/bin/sh

set -eux

yarn install
yarn prisma generate

# Reproduction via https://github.com/prisma/prisma/issues/7176
yarn prisma migrate reset --force --skip-seed
yarn prisma db push
