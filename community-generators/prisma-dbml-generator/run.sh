#!/bin/sh

set -eux

yarn install
rm ./dbml/schema.dbml || true
yarn prisma generate
