#!/bin/sh

set -eux

yarn test

if [ ! -f "yarn.lock" ]; then
  echo "Test should have produced a yarn.lock file"
  exit 1
fi
