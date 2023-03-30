#!/bin/sh

set -eu

pnpm install
pnpm prisma generate

