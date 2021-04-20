#!/bin/sh

set -eux

yarn install

yarn prisma generate

yarn tsc

yarn serverless package
ls -l .serverless

yarn serverless deploy --region "$AWS_DEFAULT_REGION"
