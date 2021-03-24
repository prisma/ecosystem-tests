#!/bin/sh

set -eux

rm -rf node_modules
yarn install --production

rm -rf gcp.zip

rm -rf node_modules/prisma
rm -rf node_modules/typescript

# zip -r gcp.zip index.js prisma/schema.prisma node_modules/**

yarn copyfiles index.js prisma/schema.prisma node_modules/** temp
yarn cross-zip temp gcp.zip

du -h ./gcp.zip
