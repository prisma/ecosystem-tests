#!/usr/bin/env bash

# equivalent of a __dirname in node.js
DIR=$(dirname "${BASH_SOURCE[0]}")

# makes sure which node_modules to use
MOD_DIR="$DIR/../../node_modules"

# workaround for an error with sourcing
TS_NODE=$(yarn --modules-folder $MOD_DIR bin ts-node)

# execute what ts-node has printed out
eval $($TS_NODE $DIR/setEnv.ts "$@")
