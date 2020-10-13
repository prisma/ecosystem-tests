#!/bin/sh

set -eu

yarn install
rm -rf dist/
NODE_ENV=production yarn parcel src/index.js --target node
