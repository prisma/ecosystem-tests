#!/bin/sh

set -eux

yarn install

yarn prisma generate

yarn tsc

yarn serverless deploy --region "$AWS_DEFAULT_REGION"
