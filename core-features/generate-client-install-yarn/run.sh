#!/bin/sh

set -eux

cp -r ../_common/generate-client-install/* .

yarn install

yarn prisma generate
