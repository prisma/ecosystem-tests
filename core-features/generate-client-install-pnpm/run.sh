#!/bin/sh

set -eux

cp -r ../_common/generate-client-install/* .

pnpm install

pnpm prisma generate
