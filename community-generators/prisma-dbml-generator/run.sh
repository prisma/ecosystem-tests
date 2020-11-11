#!/bin/sh

set -eux

yarn install
rm ./dbml/schema.dbml
yarn prisma generate
