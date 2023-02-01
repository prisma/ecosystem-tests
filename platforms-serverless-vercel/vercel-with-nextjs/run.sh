#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms vercel-with-nextjs build'

yarn

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Binary"
  export VERCEL_PROJECT_ID=$VERCEL_WITH_NEXTJS_BINARY_PROJECT_ID
else
  echo "Library (Default)"
  export VERCEL_PROJECT_ID=$VERCEL_WITH_NEXTJS_PROJECT_ID
  # Set local var to `library` for the `vercel deploy` command below
  PRISMA_CLIENT_ENGINE_TYPE=library
fi

export VERCEL_ORG_ID=$VERCEL_ORG_ID
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "PRISMA_CLIENT_ENGINE_TYPE: $PRISMA_CLIENT_ENGINE_TYPE"
yarn -s vercel deploy --prod --yes --force --token=$VERCEL_TOKEN --build-env DEBUG="prisma:*" --build-env PRISMA_CLIENT_ENGINE_TYPE="$PRISMA_CLIENT_ENGINE_TYPE" --scope=$VERCEL_ORG_ID 1> deployment-url.txt

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15
