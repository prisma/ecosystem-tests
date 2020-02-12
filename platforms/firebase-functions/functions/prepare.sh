#!/bin/sh

set -eux

yarn install
yarn tsc
yarn prisma2 generate
