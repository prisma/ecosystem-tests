#!/bin/sh

set -eux

yarn prisma db pull --print

yarn prisma db seed

yarn test
