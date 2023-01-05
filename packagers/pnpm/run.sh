#!/bin/sh

set -eu

pnpm install
pnpx prisma generate
pnpx prisma -v