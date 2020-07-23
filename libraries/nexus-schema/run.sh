#!/bin/sh

set -eux

yarn install
yarn generate
yarn build
