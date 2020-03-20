#!/bin/sh

set -eux

func="$1"

url="https://us-central1-prisma-e2e-tests-265911.cloudfunctions.net/func"

expected='{"createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl -v "$url")

firebase functions:log --only "$func"

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	sh cleanup.sh "$func"
	exit 1
fi

echo "result: $actual"

sh cleanup.sh "$func"
