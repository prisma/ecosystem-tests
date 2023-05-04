#!/bin/sh

set -eux

# this just verifies environment variables are set
x="$AWS_DEFAULT_REGION"
x="$AWS_ACCESS_KEY_ID"
x="$AWS_SECRET_ACCESS_KEY"
x="$AWS_ROLE"

pnpm install

pnpm prisma generate

pnpm tsc

sh update-code.sh
