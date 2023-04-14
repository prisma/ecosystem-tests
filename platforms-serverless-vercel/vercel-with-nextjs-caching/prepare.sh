#!/bin/sh

set -eu

export PRISMA_TELEMETRY_INFORMATION='ecosystem-tests platforms vercel-with-nextjs-caching build'

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Binary"
  export VERCEL_PROJECT_ID="$VERCEL_WITH_NEXTJS_CACHING_BINARY_PROJECT_ID"
else
  echo "Library (Default)"
  export VERCEL_PROJECT_ID="$VERCEL_WITH_NEXTJS_CACHING_PROJECT_ID"
  # Set local var to `library` for the `vercel deploy` command below
  export PRISMA_CLIENT_ENGINE_TYPE=library
fi

yarn

export VERCEL_ORG_ID="$VERCEL_ORG_ID"
echo "VERCEL_ORG_ID: $VERCEL_ORG_ID"
echo "VERCEL_PROJECT_ID: $VERCEL_PROJECT_ID"
echo "PRISMA_CLIENT_ENGINE_TYPE: $PRISMA_CLIENT_ENGINE_TYPE"
