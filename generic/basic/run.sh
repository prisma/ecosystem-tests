#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

yarn -s install
yarn -s prisma generate
