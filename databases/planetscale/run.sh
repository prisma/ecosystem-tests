#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests databases planetscale run.sh'
yarn install
yarn prisma generate
