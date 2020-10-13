#!/bin/sh

set -eu

yarn install

yarn build
yarn seed
