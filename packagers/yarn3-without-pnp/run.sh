#!/bin/sh

set -eu

# Set Yarn to berry
yarn set version berry

# To set Yarn to 3.x
yarn set version 3.x

# Set nodeLinker to node-modules
yarn config set nodeLinker node-modules

# To avoid this error 
# YN0028: │ The lockfile would have been modified by this install, which is explicitly forbidden.
YARN_ENABLE_IMMUTABLE_INSTALLS=0 yarn install

yarn prisma generate
