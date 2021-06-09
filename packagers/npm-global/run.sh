#!/bin/sh

set -eu

prisma_version="$(cat ../../.github/prisma-version.txt)"

# explicitly ignore the yarn lockfile here, npm will install the latest packages
# from the lockfile which will already ensure the correct prisma version gets fetched

mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
NPM_CONFIG_PREFIX=~/.npm-global

npm install
npm install -g prisma@${prisma_version}
prisma generate
