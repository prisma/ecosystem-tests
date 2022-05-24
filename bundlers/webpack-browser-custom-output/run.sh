#!/bin/sh

set -eu

yarn install
yarn prisma generate
rm -rf dist/
yarn webpack
