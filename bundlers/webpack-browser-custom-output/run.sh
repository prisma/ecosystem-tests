#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
rm -rf dist/
pnpm webpack
