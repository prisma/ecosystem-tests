#!/bin/sh

set -eux

func="$(cat func-tmp.txt)"
url="https://us-central1-prisma-e2e-tests-265911.cloudfunctions.net/$func"
prisma_version="$(cat ../../.github/prisma-version.txt)"

files=',"files":["client.d.ts","client.js","default.d.ts","default.js","edge.d.ts","edge.js","index-browser.js","index.d.ts","index.js","package.json","query_compiler_bg.js","query_compiler_bg.wasm","query_compiler_bg.wasm-base64.js","schema.prisma","wasm-edge-light-loader.mjs","wasm-worker-loader.mjs"]'

expected='{"version":"'$prisma_version'","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}'${files}'}'
actual=$(curl "$url")

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected'"
  echo " but got '$actual'"
  exit 1
fi

echo "result: $actual"
