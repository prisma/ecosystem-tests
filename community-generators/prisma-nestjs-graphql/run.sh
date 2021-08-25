#!/bin/sh

set -eux

yarn install
rm -r ./prisma-nestjs-graphql
yarn prisma generate
