#!/bin/sh

set -eux

cp -r ../_common/generate-client-install/* .

npm install

npx prisma generate
