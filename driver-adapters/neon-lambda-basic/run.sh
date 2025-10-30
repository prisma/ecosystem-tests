#!/bin/sh

set -eu

pnpm install
pnpm prisma generate

rm -rf lambda.zip

GENERATED_CLIENT=$(node -e "
  console.log(
    path.dirname(require.resolve('.prisma/client/package.json', {
      paths: [path.dirname(require.resolve('@prisma/client/package.json'))]
    }))
  )
")

pnpm esbuild index.js --bundle --platform=node --target=node20 --outfile=dist/index.js --format=cjs
QUERY_ENGINE_LIB="$GENERATED_CLIENT/libquery_engine-rhel-openssl-1.0.x.so.node"
if [ -f "$QUERY_ENGINE_LIB" ]; then
  cp "$QUERY_ENGINE_LIB" dist
fi
cp "$GENERATED_CLIENT/schema.prisma" dist
zip -rj lambda.zip dist

aws lambda update-function-configuration --function-name driver-adapters-neon-lambda-basic --runtime nodejs20.x --environment "Variables={DRIVER_ADAPTERS_NEON_LAMBDA_BASIC_DATABASE_URL=$DRIVER_ADAPTERS_NEON_LAMBDA_BASIC_DATABASE_URL}" --timeout 30
aws lambda update-function-code --function-name driver-adapters-neon-lambda-basic --zip-file "fileb://lambda.zip"
