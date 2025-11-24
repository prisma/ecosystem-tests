#!/bin/sh

set -eu

pnpm install

# --build-env DATAPROXY_COMMON_URL is only needed because of generate during build
pnpm vercel deploy \
--prod \
--yes \
--force \
--token=$VERCEL_TOKEN \
--scope=$VERCEL_ORG_ID \
--build-env PRISMA_GENERATE_DATAPROXY="true" \
--build-env DATAPROXY_COMMON_URL=postgres://dummy \
--env DATAPROXY_COMMON_URL="$DATAPROXY_COMMON_URL" \
--build-env DATAPROXY_FLAVOR="$DATAPROXY_FLAVOR" \
--env DATAPROXY_FLAVOR="$DATAPROXY_FLAVOR" \
| grep -oE 'https?://[^ ]+' \
| tail -n 1 \
1> deployment-url.txt

echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15

OUTPUT=$(pnpm vercel inspect --logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID 2>&1)
echo "${OUTPUT}"

# Check the Vercel Build Logs for "Generated Prisma Client"
if echo "${OUTPUT}" | grep -q 'Generated Prisma Client'; then
  echo 'Prisma Client was successfully generated'
else
  echo "Prisma Client was NOT GENERATED"
  exit 1
fi
