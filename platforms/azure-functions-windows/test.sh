#!/bin/sh

set -eux

url="https://prisma-e2e-windows-test.azurewebsites.net/api/prisma-e2e-windows-test?code=FVunlJhxUGTyrBG5Z3ji0Ak5OnobJDIBVXqN10Fvm8oMjSX5DBR0NA=="

expected='{"createUser":{"id":"12345","email":"alice@prisma.io","name":"Alice"},"updateUser":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"users":{"id":"12345","email":"bob@prisma.io","name":"Bob"},"deleteManyUsers":{"count":1}}'
actual=$(curl -v "$url")

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi

echo "result: $actual"
