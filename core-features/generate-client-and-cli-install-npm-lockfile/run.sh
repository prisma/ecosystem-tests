#!/bin/sh

set -eux

VERSION=$(cat ../../.github/prisma-version.txt)

cp -r ../_common/generate-client-and-cli-install/* .

# global instead instead
npm install -g prisma@$VERSION
prisma generate
