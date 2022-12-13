#!/bin.sh

set -eux

sh zip.sh

aws lambda create-function --function-name prisma2-e2e-tests --runtime nodejs18.x --role "$AWS_ROLE" --handler index.handler --zip-file "fileb://lambda.zip"
