#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests platforms vercel-with-nextjs build'
yarn
export VERCEL_PROJECT_ID=$VERCEL_WITH_NEXTJS_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_WITH_NEXTJS_ORG_ID
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"

# checks whether PRISMA_FORCE_NAPI has length equal to zero
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  yarn vercel --token=$VERCEL_TOKEN --prod --scope=prisma --confirm
else
  yarn vercel --token=$VERCEL_TOKEN --env PRISMA_FORCE_NAPI=true --build-env PRISMA_FORCE_NAPI=true --prod --scope=prisma --confirm
fi
sleep 15
