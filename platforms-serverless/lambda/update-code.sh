#!/bin.sh

set -eux

sh zip.sh

aws lambda update-function-configuration --function-name prisma2-e2e-tests --environment "Variables={LAMBDA_PG_URL=$LAMBDA_PG_URL}" --timeout 10

aws lambda update-function-configuration --function-name prisma2-e2e-tests --environment "Variables={PLANETSCALE_ORG=$PLANETSCALE_ORG}" --timeout 10
aws lambda update-function-configuration --function-name prisma2-e2e-tests --environment "Variables={PLANETSCALE_SERVICE_TOKEN_NAME=$PLANETSCALE_SERVICE_TOKEN_NAME}" --timeout 10
aws lambda update-function-configuration --function-name prisma2-e2e-tests --environment "Variables={PLANETSCALE_SERVICE_TOKEN=$PLANETSCALE_SERVICE_TOKEN}" --timeout 10

aws lambda update-function-code --function-name prisma2-e2e-tests --zip-file "fileb://lambda.zip"
yarn install
