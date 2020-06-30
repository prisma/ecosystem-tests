#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry.ts --url https://e2e-buildpack-pgbouncer.herokuapp.com/ --prisma-version $(sh ../../utils/prisma_version.sh)
