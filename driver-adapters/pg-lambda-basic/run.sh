#!/bin/sh

set -eu

pnpm install
pnpm prisma generate
pnpm tsc

rm -rf lambda.zip

GENERATED_CLIENT=$(node -e "
  console.log(
    path.dirname(require.resolve('./generated/client'))
  )
")

pnpm esbuild index.js --bundle --platform=node --target=node20 --outfile=dist/index.js --format=cjs
QUERY_ENGINE_LIB="$GENERATED_CLIENT/libquery_engine-rhel-openssl-3.0.x.so.node"
if [ -f "$QUERY_ENGINE_LIB" ]; then
  cp "$QUERY_ENGINE_LIB" dist
fi
cp "$GENERATED_CLIENT/schema.prisma" dist
zip -rj lambda.zip dist

aws lambda update-function-configuration --function-name driver-adapters-pg-lambda-basic --runtime nodejs20.x --environment "Variables={DATABASE_URL=$DATABASE_URL}" --timeout 30
aws lambda update-function-code --function-name driver-adapters-pg-lambda-basic --zip-file "fileb://lambda.zip"
