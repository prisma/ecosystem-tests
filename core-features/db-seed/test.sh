#!/bin/sh

set -eux

yarn prisma db seed --preview-feature
yarn test
