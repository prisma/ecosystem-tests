#!/bin/sh

set -eu

yarn prisma generate
yarn ts-node ./script.ts
