#!/usr/bin/env bash

# equivalent of a __dirname in node.js
DIR=$(dirname "${BASH_SOURCE[0]}")

# makes sure which node_modules to use
MOD_DIR="$DIR/../../node_modules"

# execute what ts-node has printed out
eval $(yarn --modules-folder $MOD_DIR ts-node $DIR/envVars.ts "$@")
