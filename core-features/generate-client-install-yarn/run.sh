#!/bin/sh

set -eux

cp -r ../_common/generate-client-install/* .

yarn install
yarn remove @prisma/client

yarn prisma generate
