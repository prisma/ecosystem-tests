#!/bin/sh

set -eux

cp ../_common/generate-client-install/* .

yarn install
yarn remove @prisma/client

yarn prisma generate
