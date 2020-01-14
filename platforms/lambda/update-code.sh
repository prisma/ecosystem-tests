#!/bin.sh

set -eux

sh zip.sh

aws lambda update-function-configuration --function-name prisma2-e2e-tests --environment "Variables={POSTGRESQL_URL=$POSTGRESQL_URL}" --timeout 10

aws lambda update-function-code --function-name prisma2-e2e-tests --zip-file "fileb://lambda.zip"
yarn install --offline
