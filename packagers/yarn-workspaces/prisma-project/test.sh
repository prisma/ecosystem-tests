#!/bin/sh

set -eu

yarn prisma2 generate
yarn ts-node ./script.ts
