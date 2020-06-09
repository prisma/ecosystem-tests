#!/bin/sh

set -eu

url="https://e2e-platforms-heroku.herokuapp.com"

prisma_version="$(cat ../../.github/prisma-version.txt)"
id="$(cat ./id.tmp)"

expected='{"version":"'$prisma_version'","createUser":{"id":"'$id'","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"'$id'","email":"bob@prisma.io","name":"Bob"},"users":{"id":"'$id'","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl "$url")

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi
