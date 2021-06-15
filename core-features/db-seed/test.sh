#!/bin/sh

set -eux

yarn prisma db pull --print
yarn prisma db seed --preview-feature
yarn test
