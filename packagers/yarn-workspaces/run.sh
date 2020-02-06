#!/bin/sh

set -eu

rm -rf prisma/migrations/
rm -rf prisma/dev.db

yarn

cd prisma-project && sh test.sh
