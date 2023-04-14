#!/bin/sh

set -eux

if [ -f "package-lock.json" ] || [ -f "yarn.lock" ]; then
  echo "Test should have produced a pnpm-lock.yaml file only"
  exit 1
fi

pnpm install
jest
