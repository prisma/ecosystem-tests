#!/bin/sh

set -eu

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  echo "Binary"
  echo "Deployment does not exist yet"
  exit 0
else
  DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
  yarn vercel logs $DEPLOYED_URL --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID
fi

