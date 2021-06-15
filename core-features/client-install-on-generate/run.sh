#!/bin/sh

set -eux

yarn install
yarn remove @prisma/client

yarn prisma generate
