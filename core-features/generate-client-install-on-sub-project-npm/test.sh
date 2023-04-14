#!/bin/sh

set -eux

cd sub-project

npm run test

if [ ! -f "package-lock.json" ]; then
  echo "Test should have produced a package-lock.json file"
  exit 1
fi
