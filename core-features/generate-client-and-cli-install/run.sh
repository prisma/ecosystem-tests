#!/bin/sh

set -eux

VERSION=$(cat ../../.github/prisma-version.txt)

# no install, instead rename file
#yarn install
mv package.json package.json.backup

# global instead instead
npm install -g prisma@$VERSION
prisma generate

