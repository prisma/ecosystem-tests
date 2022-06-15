#!/bin/sh

set -eu

yarn

yarn -s vercel --token=$VERCEL_TOKEN --build-env PRISMA_GENERATE_DATAPROXY="true" --env DATAPROXY_VERCEL_CLI_DB_URL="$DATAPROXY_VERCEL_CLI_DB_URL" --prod --scope=$VERCEL_ORG_ID --confirm --force 1> deployment-url.txt

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15

OUTPUT=$(yarn -s vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID)
echo "${OUTPUT}"

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
