#!/bin/sh

set -eu

pnpm install
pnpm prisma generate

rm -rf lambda.zip
zip --symlinks -r lambda.zip index.js prisma/schema.prisma node_modules/@prisma/client node_modules/.pnpm/@prisma+client*

aws lambda update-function-configuration --function-name driver-adapters-postgresql-lambda-basic --runtime nodejs18.x --environment "Variables={DATABASE_URL=$DATABASE_URL}" --timeout 10
aws lambda update-function-code --function-name driver-adapters-postgresql-lambda-basic --zip-file "fileb://lambda.zip"
