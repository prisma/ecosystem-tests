#!/bin/sh

set -eux

cp ../_common/generate-client-install/* .

pnpm install
pnpm remove @prisma/client

pnpm prisma generate
