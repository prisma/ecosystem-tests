#!/bin/sh

set -eu

yarn install
rm -rf dist/
yarn rollup src/index.js --file dist/index.js --format cjs
