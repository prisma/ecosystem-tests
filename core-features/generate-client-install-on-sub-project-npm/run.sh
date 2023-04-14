#!/bin/sh

set -eux

npm install

cp -r ../_common/generate-client-install-on-sub-project/* .

cp package.json sub-project

cd sub-project

npm install
npm remove @prisma/client

env DEBUG="prisma:generator" npx prisma generate

