#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms vercel-cli build'
yarn

export VERCEL_ORG_ID=$VERCEL_ORG_ID
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Binary"
  export VERCEL_PROJECT_ID=$VERCEL_API_BINARY_PROJECT_ID
  echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"

  yarn -s vercel --token=$VERCEL_TOKEN --build-env DEBUG="prisma:*" --build-env PRISMA_CLIENT_ENGINE_TYPE="binary" --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt
else
 echo "Library (Default)"
  export VERCEL_PROJECT_ID=$VERCEL_API_PROJECT_ID
  echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"

  yarn -s vercel --token=$VERCEL_TOKEN --build-env DEBUG="prisma:*" --build-env PRISMA_CLIENT_ENGINE_TYPE="library" --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt
fi

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

# sleep 15

OUTPUT=$(yarn -s vercel logs --follow $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID)
echo "${OUTPUT}"

# Check the Vercel Build Logs for the postinstal hook"
if echo "${OUTPUT}" | grep -q 'Retrieving list of deployment files'; then
  echo "Logs are starting from the top"
else
  echo "Logs are NOT starting from the top"
  exit 1
fi

# Check the Vercel Build Logs for the postinstal hook"
if echo "${OUTPUT}" | grep -q 'prisma generate || true'; then
  echo 'Postinstall hook was added'
else
  echo "Postinstall hook was NOT ADDED"
  exit 1
fi

# Check the Vercel Build Logs for "Generated Prisma Client"
if echo "${OUTPUT}" | grep -q 'Generated Prisma Client'; then
  echo 'Prisma Client Was Successfully Generated'
else
  echo "Prisma Client Was NOT GENERATED"
  exit 1
fi


