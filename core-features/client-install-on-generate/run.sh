#!/bin/sh

set -eu

yarn install
yarn remove @prisma/client

yarn prisma generate
