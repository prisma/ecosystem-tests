#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests databases heroku-pgbouncer build'
yarn install
yarn prisma generate
