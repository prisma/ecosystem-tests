#!/bin/sh

set -eux

func="$(cat func-tmp.txt)"
prisma_version="$(cat ../../.github/prisma-version.txt)"

url="https://us-central1-prisma-e2e-tests-265911.cloudfunctions.net/$func"
# checks whether PRISMA_FORCE_NAPI has length equal to zero
if [[ -z "${PRISMA_FORCE_NAPI+x}" ]]; then
  files=',"files":["index-browser.js","index.d.ts","index.js","package.json","query-engine-debian-openssl-1.1.x","schema.prisma"]'
else
  files=',"files":["index-browser.js","index.d.ts","index.js","libquery_engine_napi-debian-openssl-1.1.x.so.node","package.json","schema.prisma"]'
fi

expected='{"version":"'$prisma_version'","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}'${files}'}'
actual=$(curl "$url")

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected', got '$actual'"
  exit 1
fi

echo "result: $actual"
