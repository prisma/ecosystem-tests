#!/bin/sh

set -eux

rm -rf node_modules
yarn install --production

rm -rf lambda.zip

rm -rf node_modules/prisma
rm -rf node_modules/@prisma/engines
rm -rf node_modules/typescript

# zip -r lambda.zip index.js prisma/schema.prisma node_modules/.prisma node_modules/**

npx copyfiles index.js prisma/schema.prisma temp
npx cpr node_modules temp/node_modules 
npx --package=cross-zip-cli cross-zip temp lambda.zip

du -b ./lambda.zip
