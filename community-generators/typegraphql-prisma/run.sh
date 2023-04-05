#!/bin/sh

set -eu

pnpm install

# see https://github.com/MichalLytek/typegraphql-prisma/issues/31
SKIP_PRISMA_VERSION_CHECK=1 pnpm prisma generate
