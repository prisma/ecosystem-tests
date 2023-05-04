#!/bin/sh

set -eux

if [ -f "pnpm-lock.yaml" ] || [ -f "yarn.lock" ]; then
  echo "\`prisma generate\` should have produced a package-lock.json file only"
  exit 1
fi

npm install
npm test
