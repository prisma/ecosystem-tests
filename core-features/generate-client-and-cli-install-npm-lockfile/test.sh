#!/bin/sh

set -eux

jest

if [ -f "pnpm-lock.yaml" ] || [ -f "yarn.lock" ]; then
  echo "Test should have produced a package-lock.json file only"
  exit 1
fi
