#!/bin/sh

set -eux

yarn install

yarn prisma2 generate

yarn tsc

serverless deploy --region "$AWS_DEFAULT_REGION"

sh test.sh
