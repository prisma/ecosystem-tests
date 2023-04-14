#!/bin/sh

set -eux

pnpm install

cp -r ../_common/generate-client-install-on-sub-project/* .

cp package.json sub-project

cd sub-project

pnpm install
pnpm remove @prisma/client

env DEBUG="prisma:generator" pnpm prisma generate

