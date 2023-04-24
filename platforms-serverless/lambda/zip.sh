#!/bin/sh

set -eux

rm -rf lambda.zip

zip --symlinks -r lambda.zip index.js prisma/schema.prisma node_modules/@prisma/client node_modules/.pnpm/@prisma+client*

du -b ./lambda.zip
