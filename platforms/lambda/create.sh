#!/bin.sh

set -eux

role="arn:aws:iam::735132418708:role/service-role/prisma-e2e-tests-role-mj6fayzz"

sh zip.sh

aws lambda create-function --function-name prisma2-e2e-tests --runtime nodejs12.x --role "$role" --handler index.handler --zip-file "fileb://lambda.zip"
