#!/bin/sh

set -eux

yarn install
yarn generate

sh test.sh
