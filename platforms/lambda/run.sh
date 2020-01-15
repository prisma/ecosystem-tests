#!/bin/sh

set -eux

# this just verifies environment variables are set
x="$POSTGRESQL_URL"
x="$AWS_DEFAULT_REGION"
x="$AWS_ACCESS_KEY_ID"
x="$AWS_SECRET_ACCESS_KEY"
x="$AWS_ROLE"

yarn install

yarn tsc

yarn prisma2 generate

sh update-code.sh

sh test.sh
