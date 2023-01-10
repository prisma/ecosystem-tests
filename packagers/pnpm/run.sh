#!/bin/sh

set -eu

pnpm install
pnpm exec prisma generate
pnpm exec prisma -v