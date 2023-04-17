#!/bin/sh

set -eux

cd sub-project

yarn test

if [ ! -f "yarn.lock" ]; then
  echo "\`prisma generate\` should have produced a yarn.lock file"
  exit 1
fi

