#!/bin/sh

set -eu

yarn start &
pid=$!

sleep 10

prismaVersion=$(sh ../../utils/prisma_version.sh)

expected="{\"data\":{\"users\":[],\"prismaVersion\":{\"version\":\"$prismaVersion\"}}}"
actual=$(curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazFxZmxoNm0wMDAweGZ4MThqZjRiNG54IiwiaWF0IjoxNTcxMDU4NTEzfQ.BvbHbNxQFUyg2BnovArUowaBOImjp1TeRf7P6rsiHYw' --data-binary '{"query":"query {\n  users{\n    id\n    email\n    name\n  }\n  prismaVersion {\n    version\n  }\n}"}' --compressed)

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected', got '$actual'"
  kill $pid
  exit 1
fi

echo "result: $actual"

kill $pid
