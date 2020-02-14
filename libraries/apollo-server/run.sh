#!/bin/sh

set -eu

yarn install
yarn tsc
yarn prisma2 generate

sh test.sh
