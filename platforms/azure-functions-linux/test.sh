#!/bin/sh

set -eux

url="https://prisma-e2e-linux-test-azure-functions-is-so-amazing.azurewebsites.net/api/prisma-e2e-linux-test-azure-functions-is-so-amazing?code=a7HWAhCiFFMCa96cgxkVahgIjn6j15Hkdt9ah1OMSG0zamsHtwTnvw=="

expected='{"createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl -v "$url")

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi

echo "result: $actual"
