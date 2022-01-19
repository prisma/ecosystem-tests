#!/bin/sh

set -eux

yarn install

yarn prisma generate

yarn tsc

# Trying this for debugging and should be removed after
export SLS_DEBUG=*
yarn serverless deploy --region "$AWS_DEFAULT_REGION"
