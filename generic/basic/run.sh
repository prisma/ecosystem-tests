#!/bin/sh

set -eux

export DEBUG="*"
export RUST_BACKTRACE=full

openssl version

nvm install --lts

brew install openssl@1.1

openssl version

yarn install
yarn prisma generate
