#!/bin/sh

set -eux

rm -rf node_modules
yarn install --production

rm -rf gcp.zip

rm -rf node_modules/prisma2
rm -rf node_modules/typescript

zip -r gcp.zip index.js prisma/schema.prisma node_modules/**

du -h ./gcp.zip
