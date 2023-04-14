#!/bin/sh

set -eux

VERSION=$(cat ../../.github/prisma-version.txt)

# global instead instead
npm install -g prisma@$VERSION
prisma generate
