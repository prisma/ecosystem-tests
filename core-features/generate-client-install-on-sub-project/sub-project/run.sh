#!/bin/sh

set -eux

pnpm install
yarn remove @prisma/client

env DEBUG="prisma:generator" yarn prisma generate
