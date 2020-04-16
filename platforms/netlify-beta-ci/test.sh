#!/bin/sh

set -eu

url="https://prisma2-e2e-tests-netlify-beta-ci.netlify.app/.netlify/functions/index"

printf "curl: %s\n" "$(curl "$url")"

prisma_version="$(cat ../../.github/prisma-version.txt)"

expected='{"version":"'$prisma_version'","createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl "$url")

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi
