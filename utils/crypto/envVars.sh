#!/usr/bin/env bash

# equivalent of dirname in node.js
DIR=$(dirname "${BASH_SOURCE[0]}")

# execute what ts-node has printed
eval $(ts-node $DIR/envVars.ts "$@")
