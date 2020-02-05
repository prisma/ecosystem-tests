#!/bin/sh

set -eux

url="https://prisma-e2e-linux-test.azurewebsites.net/api/prisma-e2e-linux-test?code=2apwPxNqxtD1MnsnsQM0BeXAa8ANLI2egehrNnWIa39p6O5k6WpRJw=="

expected='{"createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl -v "$url")

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi

echo "result: $actual"
