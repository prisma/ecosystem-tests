#! /bin/sh

set -eux

sh zip.sh

aws lambda update-function-configuration --function-name prisma2-e2e-tests --runtime nodejs16.x --environment "Variables={DATABASE_URL=$DATABASE_URL}" --timeout 10

aws lambda update-function-code --function-name prisma2-e2e-tests --zip-file "fileb://lambda.zip"
pnpm install
