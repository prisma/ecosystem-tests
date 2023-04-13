#!/bin/sh

set -eux

pnpm install
pnpm remove @prisma/client

env DEBUG="prisma:generator" pnpm prisma generate
