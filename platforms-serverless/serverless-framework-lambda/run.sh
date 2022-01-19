#!/bin/sh

set -eux

yarn install

yarn prisma generate

yarn tsc

# Turn serverless CLI logs to verbose
# Useful for debugging aws permissions errors (and probably more)
export SLS_DEBUG=*

yarn serverless deploy --region "$AWS_DEFAULT_REGION"
