#!/bin/sh

set -eux

pnpm install
pnpm prisma generate
