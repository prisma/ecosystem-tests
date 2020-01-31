#!/bin/sh

set -eux

func="$1"

url="https://us-central1-prisma-e2e-tests-265911.cloudfunctions.net/$func"

expected='{"createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl -v "$url")

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi

echo "result: $actual"
