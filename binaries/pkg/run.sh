#!/bin/sh

set -eu

yarn install

mkdir -p node_modules/@prisma/cli/node_modules/@prisma/engines
cp -R node_modules/@prisma/engines/* node_modules/@prisma/cli/node_modules/@prisma/engines
