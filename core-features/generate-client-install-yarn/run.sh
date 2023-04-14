#!/bin/sh

set -eux

pnpm install
pnpm remove @prisma/client

pnpm prisma generate
