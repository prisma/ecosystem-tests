#!/bin/sh

set -eux

app="$(cat func-tmp.txt)"
url="https://$app.azurewebsites.net/api/$app"
prisma_version="$(cat ../../.github/prisma-version.txt)"

expected='{"version":"'$prisma_version'","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"}}'
# TODO Add engineString to check for engine files
actual=$(curl "$url")

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected'"
  echo " but got '$actual'"
  exit 1
fi

echo "result: $actual"
