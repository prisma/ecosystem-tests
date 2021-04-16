#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry.ts --url https://prisma2-e2e-tests-netlify-ci.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string ',"files":["index-browser.js","index.d.ts","index.js","package.json","query-engine-rhel-openssl-1.0.x","schema.prisma"]}'
