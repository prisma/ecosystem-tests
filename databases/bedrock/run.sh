#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

yarn install
yarn prisma generate

yarn prisma migrate save --create-db --experimental
yarn prisma migrate up --create-db --experimental