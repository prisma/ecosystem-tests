#!/bin/sh

set -eu

yarn install
yarn prisma generate

sh build.sh
sleep 10
