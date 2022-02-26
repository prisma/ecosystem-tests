#!/bin/sh

set -eu

pnpm install
pnpx prisma generate
