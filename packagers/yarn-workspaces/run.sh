#!/bin/sh

set -eu

yarn

cd prisma-project && sh test.sh
