#!/bin/sh

set -eu

ID=$( tail -n 1 id.txt )

if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  files=',"files":["index-browser.js","index.d.ts","index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]'
else
  files=',"files":["index-browser.js","index.d.ts","index.js","package.json","libquery_engine_napi-rhel-openssl-1.0.x.so.node","schema.prisma"]'
fi

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://$ID--prisma2-e2e-tests-netlify-ci.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string $files
