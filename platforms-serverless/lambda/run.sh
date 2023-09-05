#!/bin/sh

set -eux

# this just verifies environment variables are set
x="$AWS_DEFAULT_REGION"
x="$AWS_ACCESS_KEY_ID"
x="$AWS_SECRET_ACCESS_KEY"
x="$AWS_ROLE"

pnpm install
pnpm prisma generate
pnpm tsc

rm -rf lambda.zip
zip --symlinks -r lambda.zip index.js prisma/schema.prisma node_modules/@prisma/client node_modules/.pnpm/@prisma+client*
du -b ./lambda.zip

aws lambda update-function-configuration --function-name "platforms-serverless-lambda-$PRISMA_CLIENT_ENGINE_TYPE" --runtime nodejs18.x --environment "Variables={DATABASE_URL=$DATABASE_URL}" --timeout 10
aws lambda update-function-code --function-name "platforms-serverless-lambda-$PRISMA_CLIENT_ENGINE_TYPE" --zip-file "fileb://lambda.zip"
