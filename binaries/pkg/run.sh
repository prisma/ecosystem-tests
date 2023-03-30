#!/bin/sh

set -eu

pnpm install

# This is a hack to work around a problem that pkg would otherwise have with the Engines binaries missing in the package
CLI_PACKAGE=$(node -e "console.log(path.dirname(require.resolve('prisma/package.json')))")
ENGINES_PACKAGE=$(node -e "console.log(path.dirname(require.resolve('@prisma/engines/package.json', {paths: ['$CLI_PACKAGE']})))")

mkdir -p node_modules/prisma/node_modules/@prisma/engines
cp -fR $ENGINES_PACKAGE/* node_modules/prisma/node_modules/@prisma/engines
