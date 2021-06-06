#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://e2e-platforms-heroku.herokuapp.com --prisma-version $(sh ../../utils/prisma_version.sh)
# TODO Add binary string to script call so it confirms engine files
