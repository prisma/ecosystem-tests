#!/bin/sh

set -eux

yarn install

# copy common test files to create the sub-project
cp -r ../_common/generate-client-install-on-sub-project/* .

cp package.json sub-project

cd sub-project

yarn install

# this test wants to make sure that the prisma client is installed in the
# sub-project even if it is already installed in the root project. This is why
# it is present in the root project's package.json and we remove it here.
yarn remove @prisma/client

env DEBUG="prisma:generator" yarn prisma generate

