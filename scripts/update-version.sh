#! /bin/sh

PRISMA_VERSION=$(node -e "console.log(require('./package.json')?.devDependencies?.['prisma'] || require('./package.json')?.dependencies?.['prisma']) || ''")
CLIENT_VERSION=$(node -e "console.log(require('./package.json')?.devDependencies?.['@prisma/client'] || require('./package.json')?.dependencies?.['@prisma/client']) | ''")

if [ -n "$PRISMA_VERSION" ]; then sed -i "s/$PRISMA_VERSION/$1/g" package.json; fi
if [ -n "$CLIENT_VERSION" ]; then sed -i "s/$CLIENT_VERSION/$1/g" package.json; fi
