#!/bin/sh

set -eux

pnpm install
rm -fr ./prisma-nestjs-graphql
pnpm prisma generate
