#!/bin/sh

set -eu

# To set Yarn to 3.x
yarn set version 3.x

# To avoid this error 
# YN0028: │ The lockfile would have been modified by this install, which is explicitly forbidden.
YARN_ENABLE_IMMUTABLE_INSTALLS=0 yarn install
