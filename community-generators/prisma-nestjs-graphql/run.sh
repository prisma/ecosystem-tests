#!/bin/sh

set -eux

pnpm install
rm -r ./prisma-nestjs-graphql
pnpm prisma generate
