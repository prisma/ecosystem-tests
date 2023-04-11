#!/bin/sh

set -eux

npm install
npx prisma generate
npx tsc

# Turn serverless CLI logs to verbose
# Useful for debugging aws permissions errors (and probably more)
export SLS_DEBUG=*

npx serverless deploy --region "$AWS_DEFAULT_REGION"
