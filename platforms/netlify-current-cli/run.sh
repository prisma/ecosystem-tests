#!/bin/sh

set -eu

yarn install
export PRISMA_TELEMETRY_INFORMATION='e2e-tests platforms netlify-cli build'
yarn prisma generate

sh build.sh
sleep 10
