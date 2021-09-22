#!/bin/sh

set -eu

yarn set version berry
yarn install
yarn prisma generate
