#!/bin/sh

set -eux

yarn install
yarn remove @prisma/client

env DEBUG="prisma:generator" yarn prisma generate
