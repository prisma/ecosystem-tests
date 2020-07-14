#!/bin/sh

set -eu

yarn install
yarn tsc
yarn prisma generate
