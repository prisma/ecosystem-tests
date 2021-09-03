#!/bin/sh

set -eux

yarn install
yarn prisma generate

yarn prisma db push
