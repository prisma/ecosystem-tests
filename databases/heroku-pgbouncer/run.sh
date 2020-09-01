#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests databases heroku-pgbouncer build'
yarn install
yarn prisma generate
