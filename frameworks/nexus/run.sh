#!/bin/sh

set -eux

yarn install
yarn generate
yarn build

sh test.sh
