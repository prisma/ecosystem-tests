#!/bin/sh

set -eu
# Replace by the following line to debug this script
# set -eux

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms vercel-cli build'

yarn

# Note: be aware that Vercel truncates logs, so if you add something like `--build-env DEBUG="prisma:*"` plenty of logs will be missing.
# That will likely influence the "Postinstall hook" check below, which will result in the CI failing with error code `1`.

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Binary"
  export VERCEL_PROJECT_ID=$VERCEL_API_BINARY_PROJECT_ID
else
 echo "Library (Default)"
  export VERCEL_PROJECT_ID=$VERCEL_API_PROJECT_ID
  # Set `libray` as default engine type, no matter what might be set already (except `binary`)
  export PRISMA_CLIENT_ENGINE_TYPE=library
fi

export VERCEL_ORG_ID=$VERCEL_ORG_ID
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "PRISMA_CLIENT_ENGINE_TYPE: $PRISMA_CLIENT_ENGINE_TYPE"
yarn -s vercel deploy --yes --force --token=$VERCEL_TOKEN --build-env PRISMA_CLIENT_ENGINE_TYPE="$PRISMA_CLIENT_ENGINE_TYPE" --scope=$VERCEL_ORG_ID 1> deployment-url.txt

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
DEPLOYED_URL_API=$( tail -n 1 deployment-url.txt )/api
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 10

OUTPUT=$(yarn -s vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID)
echo "${OUTPUT}"

# Check the Vercel Build Logs for the postinstal hook"
if echo "${OUTPUT}" | grep -q 'prisma generate || true'; then
  echo 'Postinstall hook was added'
else
  echo "Postinstall hook was NOT ADDED"
  # exit 1
fi

# Check the Vercel Build Logs for "Generated Prisma Client"
if echo "${OUTPUT}" | grep -q 'Generated Prisma Client'; then
  echo 'Prisma Client Was Successfully Generated'
else
  echo "Prisma Client Was NOT GENERATED"
  # exit 1
fi

# if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
#   echo "Binary"
#   files=',"files":["index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]'
#   else
#   echo "Library (Default)"
#   files=',"files":["index.js","libquery_engine-rhel-openssl-1.0.x.so.node","package.json","schema.prisma"]'
# fi

# TODO Use deployment, not production
# npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url  --prisma-version "$(sh ../../utils/prisma_version.sh)" --binary-string $files

echo '\nIt should succeed:'
curl -H "Accept: application/json" "$DEPLOYED_URL_API"
echo ''


# ----

# Modify the Prisma schema and comment `name  String?`
echo ''
cp ./prisma/schema2.prisma ./prisma/schema.prisma
cat ./prisma/schema.prisma

# Sync the Prisma schema with the db
yarn prisma db push --accept-data-loss

# Without --force this time!
echo ''
yarn -s vercel deploy --yes --token=$VERCEL_TOKEN --build-env PRISMA_CLIENT_ENGINE_TYPE="$PRISMA_CLIENT_ENGINE_TYPE" --scope=$VERCEL_ORG_ID 1> deployment-url.txt


cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
DEPLOYED_URL_API=$( tail -n 1 deployment-url.txt )/api
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 10

OUTPUT=$(yarn -s vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID)
echo ''
echo "${OUTPUT}"
echo ''

# Check the Vercel Build Logs for the postinstal hook"
if echo "${OUTPUT}" | grep -q 'prisma generate || true'; then
  echo 'Postinstall hook was added'
else
  echo "Postinstall hook was NOT ADDED"
  # exit 1
fi

# Check the Vercel Build Logs for "Generated Prisma Client"
if echo "${OUTPUT}" | grep -q 'Generated Prisma Client'; then
  echo 'Prisma Client Was Successfully Generated'
else
  echo "Prisma Client Was NOT GENERATED"
  # exit 1
fi

echo 'An error is expected:'
curl -H "Accept: application/json" "$DEPLOYED_URL_API"
echo ''
