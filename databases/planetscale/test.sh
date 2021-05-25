#!/bin/sh

set -eu

pscale version
pscale connect e2e-tests main --execute-protocol 'mysql' --debug --execute 'yarn test'
