#!/bin/sh

set -eux

pnpm install
rm ./dbml/schema.dbml || true
pnpm prisma generate
