#!/bin/sh

set -eux

yarn install

# This is a hack to work around a problem that pkg would otherwise have with the Engines binaries missing in the package
mkdir -p node_modules/prisma/node_modules/@prisma/engines
cp --verbose -R node_modules/@prisma/engines/* node_modules/prisma/node_modules/@prisma/engines
