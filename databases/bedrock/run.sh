#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

yarn install
yarn prisma generate

TODO Migrate DB and seed with data
