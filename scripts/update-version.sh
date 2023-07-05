#! /bin/sh

PRISMA_VERSION=$(node -e "const pkg = require('./package.json'); console.log(pkg?.devDependencies?.['prisma'] || pkg?.dependencies?.['prisma'] || pkg?.resolutions?.['prisma'] || '')")
CLIENT_VERSION=$(node -e "const pkg = require('./package.json'); console.log(pkg?.devDependencies?.['@prisma/client'] || pkg?.dependencies?.['@prisma/client'] || pkg?.resolutions?.['@prisma/client'] || '')")

if [ -n "$PRISMA_VERSION" ]; then sed -i "s/$PRISMA_VERSION/$1/g" package.json; fi
if [ -n "$CLIENT_VERSION" ]; then sed -i "s/$CLIENT_VERSION/$1/g" package.json; fi
