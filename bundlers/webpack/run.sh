#!/bin/sh

set -eu

yarn install
rm -rf dist/
yarn webpack
