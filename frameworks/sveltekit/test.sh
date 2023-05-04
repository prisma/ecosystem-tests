#!/bin/sh

set -eux

pnpm preview --port 3000 &
pid=$!

sleep 5

expected="{\"createUser\":{\"name\":\"Alice\"},\"updateUser\":{\"name\":\"Bob\"},\"deleteUser\":{\"name\":\"Bob\"},\"enumValue\":\"ADMIN\"}"
actual=$(curl localhost:3000/data)

if [ "$expected" != "$actual" ]; then
  echo "expected '$expected', got '$actual'"
  kill $pid
  exit 1
fi

echo "result: $actual"

kill $pid
