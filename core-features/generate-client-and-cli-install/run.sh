#!/bin/sh

set -eux

VERSION=$(cat .github/prisma-version.txt)

# no install, instead rename file
#yarn install

# global instead instead
npm install -g prisma@$VERSION
prisma generate

