#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='e2e-tests platforms vercel-node-builder build'
yarn

export VERCEL_PROJECT_ID=$VERCEL_NODE_BUILDER_PROJECT_ID
export VERCEL_ORG_ID=$VERCEL_NODE_BUILDER_ORG_ID
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"

yarn vercel --token=$VERCEL_TOKEN --prod --scope=prisma --confirm --force 1> deployment-url.txt
cat deployment-url.txt
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
echo "Deployed to ${DEPLOYED_URL}"

sleep 15
