#!/bin/sh

set -eux

if [ ! -f "package-lock.json" ]; then
  echo "Test should have produced a package-lock.json file"
  exit 1
fi

npm install
npm test
