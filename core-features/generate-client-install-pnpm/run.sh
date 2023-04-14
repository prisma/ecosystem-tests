#!/bin/sh

set -eux

cp -r ../_common/generate-client-install/* .

pnpm install
pnpm remove @prisma/client

pnpm prisma generate
