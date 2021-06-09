#!/bin/sh

set -eu
DEPLOYED_URL=$( tail -n 1 deployment-url.txt )

# checks whether PRISMA_FORCE_NAPI has length equal to zero
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  files=',"files":["index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]'
else
  files=',"files":["index.js","libquery_engine_napi-rhel-openssl-1.0.x.so.node","package.json","schema.prisma"]'
fi

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url $DEPLOYED_URL --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string ${files}
