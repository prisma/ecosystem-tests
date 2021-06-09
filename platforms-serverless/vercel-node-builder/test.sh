#!/bin/sh

set -eu
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )
npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url $DEPLOYED_URL --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string ',"files":["index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]'
