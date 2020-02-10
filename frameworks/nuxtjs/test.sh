#!/bin/sh

set -eux

yarn start &
pid=$!

sleep 10

# create user, but ignore if already exists
set +e
curl -s 'http://localhost:3000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"mutation {\n  signupUser(data: {\n    email: \"asdf\",\n    name: \"asdf\",\n  }) {\n    id\n    email\n    name\n  }\n}"}' --compressed
set -e

actual=$(curl 'http://localhost:3000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"mutation {\n  createDraft(title: \"hi\", content: \"what up\", authorEmail: \"asdf\") {\n    title\n    content\n  }\n}"}' --compressed)

expected='{"data":{"createDraft":{"title":"hi","content":"what up"}}}'

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	exit 1
fi

echo "result: $actual"

kill $pid
