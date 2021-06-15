#!/bin/sh

set -eu

yarn remove @prisma/client

yarn install
yarn prisma generate
