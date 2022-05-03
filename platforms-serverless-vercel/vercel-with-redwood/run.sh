#!/bin/sh

set -eu

yarn policies set-version 1.18.0

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms vercel-with-redwood build'

node patch-package-json.js
yarn

export VERCEL_PROJECT_ID=$VERCEL_WITH_REDWOOD_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_ORG_ID
export FORCE_RUNTIME_TAG=canary
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"
echo "FORCE_RUNTIME_TAG $FORCE_RUNTIME_TAG"

yarn redwood deploy vercel --no-data-migrate --no-prisma

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  yarn -s vercel --token=$VERCEL_TOKEN --env DATABASE_URL=$DATABASE_URL --build-env PRISMA_CLIENT_ENGINE_TYPE='binary' --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt
else
  yarn -s vercel --token=$VERCEL_TOKEN --env DATABASE_URL=$DATABASE_URL --build-env PRISMA_CLIENT_ENGINE_TYPE='library' --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt
fi

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15
