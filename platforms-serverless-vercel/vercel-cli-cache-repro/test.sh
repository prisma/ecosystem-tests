#!/bin/sh

set -eux

if [ "$PRISMA_CLIENT_ENGINE_TYPE" == "binary" ]; then
  # files=',"files":["index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]'
  echo "Binary"
  echo "Deployment does not exist yet"
  exit 0
else
  files=',"files":["index.js","libquery_engine-rhel-openssl-1.0.x.so.node","package.json","schema.prisma"]'
fi

DEPLOYED_URL_API=$( tail -n 1 deployment-url.txt )/api

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url "$DEPLOYED_URL_API" --prisma-version "$(sh ../../utils/prisma_version.sh)" --binary-string "${files}"
