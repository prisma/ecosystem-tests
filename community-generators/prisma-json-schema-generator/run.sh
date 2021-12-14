#!/bin/sh

set -eux

yarn install
rm ./json-schema/json-schema.json || true
yarn prisma generate
