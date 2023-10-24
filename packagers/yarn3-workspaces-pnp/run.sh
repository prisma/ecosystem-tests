#!/bin/sh

set -eu

# YARN_IGNORE_NODE=1 is needed to ignore the Node.js version 
# since the latest version needs v18+
# TODO: remove once we switched to v18
export YARN_IGNORE_NODE=1 

# We must set yarn to berry first
# if not this error will show up later
# error An unexpected error occurred: "Release not found: 3.x".
yarn set version berry

# To set Yarn to 3.x
yarn set version 3.x

# To avoid this error 
# YN0028: │ The lockfile would have been modified by this install, which is explicitly forbidden.
YARN_ENABLE_IMMUTABLE_INSTALLS=0 yarn install
