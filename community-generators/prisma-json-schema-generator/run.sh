#!/bin/sh

set -eux

pnpm install
rm ./json-schema/json-schema.json || true
pnpm prisma generate
