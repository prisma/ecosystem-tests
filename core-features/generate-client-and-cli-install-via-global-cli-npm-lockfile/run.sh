#!/bin/sh

set -eux

VERSION=$(cat ../../.github/prisma-version.txt)

cp -r ../_common/generate-client-and-cli-install/* .

# install prisma globally to test that it can install the client & cli
npm install -g prisma@$VERSION
prisma generate
