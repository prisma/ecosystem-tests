#!/bin/sh

set -eu

prisma_version="$(cat ../../.github/prisma-version.txt)"

npm install
npm install -g prisma@${prisma_version}
prisma generate
prisma -v