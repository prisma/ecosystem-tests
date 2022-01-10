#!/usr/bin/env bash

# disable cmd printings in this script
# we don't want sensitive info to leak
if [[ $- == *x* ]]; then # if -x is on
    set +x # then we disable it
    HAS_X_FLAG=true
fi

# equivalent of a __dirname in node.js
DIR=$(dirname "${BASH_SOURCE[0]}")

# makes sure which node_modules to use
MOD_DIR="$DIR/../../node_modules"

# workaround for an error with sourcing
TS_NODE=$(yarn --modules-folder $MOD_DIR bin ts-node)

# execute what ts-node has printed out
eval $($TS_NODE $DIR/setEnv.ts "$@")

# reactivate -x flag for cmd printing
if [[ "${HAS_X_FLAG-}" == true ]]; then
    set -x
fi
