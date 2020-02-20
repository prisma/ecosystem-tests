#!/bin/sh

set -eu

yarn install
yarn prisma2 generate
yarn cmd
