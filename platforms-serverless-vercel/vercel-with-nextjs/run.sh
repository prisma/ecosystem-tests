#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms vercel-with-nextjs build'
yarn
export VERCEL_PROJECT_ID=$VERCEL_WITH_NEXTJS_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_ORG_ID
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  yarn -s vercel --token=$VERCEL_TOKEN --build-env PRISMA_CLIENT_ENGINE_TYPE="binary" --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt
else
  yarn -s vercel --token=$VERCEL_TOKEN --build-env PRISMA_CLIENT_ENGINE_TYPE="library" --prod --scope=$VERCEL_ORG_ID --force --confirm 1> deployment-url.txt
fi


echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15
