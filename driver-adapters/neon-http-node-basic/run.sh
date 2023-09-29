#!/bin/sh

set -eu

pnpm install
pnpm prisma db push
