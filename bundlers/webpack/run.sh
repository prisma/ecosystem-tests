#!/bin/sh

set -eu

yarn install
yarn prisma2 generate
rm -rf dist/
yarn webpack
