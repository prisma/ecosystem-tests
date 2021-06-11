#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests platforms vercel-with-nextjs build'
yarn
export VERCEL_PROJECT_ID=$VERCEL_WITH_NEXTJS_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_WITH_NEXTJS_ORG_ID
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"

# When PRISMA_FORCE_NAPI is set, overwrite existing schema file with one that enables the napi preview feature
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  # use the default schema at prisma/schema.prisma file
  true
else
  mv ./prisma/schema-with-napi.prisma ./prisma/schema.prisma
fi

yarn -s vercel --token=$VERCEL_TOKEN --scope=prisma --confirm 1> deployment-url.txt


echo ''
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo ''
echo "Deployed to ${DEPLOYED_URL}"

sleep 15
