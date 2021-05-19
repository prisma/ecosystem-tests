#!/bin/sh

set -eu

# pscale connect test main --execute 'yarn test' <-- Does not work because of "Query engine exited with code 1"
pscale connect test main | yarn test