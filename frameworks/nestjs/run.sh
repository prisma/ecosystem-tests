#!/bin/sh

set -eu

yarn install
yarn prisma generate

yarn build
yarn seed
