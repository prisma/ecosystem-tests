#!/bin/sh

set -eux

yarn start &
pid=$!

sleep 10

id="$GITHUB_RUN_ID"

# create user, but ignore if already exists
curl -s 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"mutation {\n  signupUser(data: {\n    email: \"'$id'\",\n    name: \"'$id'\",\n  }) {\n    id\n    email\n    name\n  }\n}"}' --compressed

actual=$(curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query {\n  user(where: { email: \"'$id'\" }) {\n    name\n    email\n  }\n}\n"}' --compressed)

expected='{"data":{"user":{"name":"'$id'","email":"'$id'"}}}'

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi

echo "result: $actual"

kill $pid
