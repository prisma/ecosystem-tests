#!/bin/bash

set -e

cp -R ./prisma ./functions/prisma
# yarn netlify build
yarn netlify deploy --prod
rm -rf functions/prisma

sh test.sh
