#!/bin/sh

set -eux

yarn install

cp -r ../_common/generate-client-install-on-sub-project/* .

cp package.json sub-project

cd sub-project

yarn install
yarn remove @prisma/client

env DEBUG="prisma:generator" yarn prisma generate

