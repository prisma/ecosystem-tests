#!/bin/sh

set -eux

yarn prisma generate
yarn tsc
yarn tsx ./script.ts
yarn prisma -v
