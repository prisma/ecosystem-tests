#!/bin/sh

set -eu

sandbox_id=$(cat sandbox_id)

url="https://$sandbox_id.sse.codesandbox.io"

prisma_version="$(cat ../../.github/prisma-version.txt)"

expected='{"version":"'$prisma_version'","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
# TODO Add engineString to check for engine files
actual=$(curl "$url")

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected', got '$actual'"
  exit 1
fi
