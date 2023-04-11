#!/bin/sh

set -eux

pnpm install

pnpm prisma generate

pnpm tsc

# Turn serverless CLI logs to verbose
# Useful for debugging aws permissions errors (and probably more)
export SLS_DEBUG=*

pnpm serverless deploy --region "$AWS_DEFAULT_REGION"
