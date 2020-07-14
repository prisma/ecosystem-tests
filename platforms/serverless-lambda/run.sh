#!/bin/sh

set -eux

yarn install

yarn prisma generate

yarn tsc

serverless deploy --region "$AWS_DEFAULT_REGION"
