#!/usr/bin/env bash

# disable cmd printings in this script
# we don't want sensitive info to leak
if [[ $- == *x* ]]; then # if -x is on
    set +x # then we disable it
    HAS_X_FLAG=true
fi

# equivalent of a __dirname in node.js
DIR=$(dirname "${BASH_SOURCE[0]}")

# execute what ts-node has printed out
eval $(pnpm ts-node $DIR/setEnv.ts "$@")

# reactivate -x flag for cmd printing
if [[ "${HAS_X_FLAG-}" == true ]]; then
    set -x
fi
