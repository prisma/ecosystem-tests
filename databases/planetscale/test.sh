#!/bin/sh

set -eu

pscale version
pscale connect e2e-tests main --execute-protocol 'mysql' --execute-env-url 'PLANETSCALE_DATABASE_URL' --execute 'yarn test' --debug
