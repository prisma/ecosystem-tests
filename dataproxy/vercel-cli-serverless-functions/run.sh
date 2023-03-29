#!/bin/sh

set -eu

yarn

yarn -s vercel deploy \
--prod \
--yes \
--force \
--token=$VERCEL_TOKEN \
--scope=$VERCEL_ORG_ID \
--build-env PRISMA_GENERATE_DATAPROXY="true" \
--env DATAPROXY_VERCEL_CLI_SERVERLESS_FUNCTIONS_DB_URL="$DATAPROXY_VERCEL_CLI_SERVERLESS_FUNCTIONS_DB_URL" \
1> deployment-url.txt

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15

OUTPUT=$(pnpm vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID)
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
  echo 'Prisma Client was successfully generated'
else
  echo "Prisma Client was NOT GENERATED"
  exit 1
fi

# Check the Vercel Build Logs for "| dataproxy" in generate
if echo "${OUTPUT}" | grep -q '| dataproxy'; then
  echo 'Data Proxy was successfully enabled'
else
  echo "Data Proxy was NOT ENABLED"
  exit 1
fi
