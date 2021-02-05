#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests platforms vercel-api build'
yarn
export VERCEL_PROJECT_ID=$VERCEL_API_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_API_ORG_ID
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"
yarn vercel --token=$VERCEL_TOKEN --prod --scope=prisma --confirm --force > deployment-url.txt
DEPLOYED_URL=`cat deployment-url.txt`
echo "Delopyed Url"
echo "${DEPLOYED_URL}"
echo "Delopyed Url"
sleep 15
OUTPUT=$(yarn vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=prisma)
echo "${OUTPUT}"
echo "${OUTPUT}" | grep -q 'Generated Prisma Client' && echo 'Prisma Client Was Successfully Generated'
echo $hash
