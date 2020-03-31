#!/bin/sh

set -eux

yarn install
yarn prisma2 generate

yarn build
