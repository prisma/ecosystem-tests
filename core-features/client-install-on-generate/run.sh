#!/bin/sh

set -eux

pwd

yarn install
yarn remove @prisma/client

yarn prisma generate
