#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests databases planetscale run.sh'
yarn install
yarn prisma generate
