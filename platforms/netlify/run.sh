#!/bin/sh

set -eu

yarn install
yarn prisma2 generate

sh build.sh
sh test.sh
