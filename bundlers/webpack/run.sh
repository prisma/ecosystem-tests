#!/bin/sh

set -eu

pnpminstall
pnpm prisma generate
rm -rf dist/
pnpm webpack
